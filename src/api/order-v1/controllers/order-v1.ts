/**
 *  order controller
 */

import { factories } from "@strapi/strapi";
import { checkoutV1 } from "../../../services/bepaid";

export default factories.createCoreController(
    "api::order-v1.order-v1",
    ({ strapi }) => ({
        async checkout(ctx) {
            const user = ctx.state.user;
            const orderService = strapi.service("api::order-v1.order-v1");

            const {
                products: rawProducts,
                paymentMethod,
                userName,
                phone,
                email,
                address,
                userType,
                tin,
                companyName,
                comment,
            } = ctx.request.body;
            const products = JSON.parse(rawProducts);

            const fileFromForm = ctx.request.files?.file;
            const validationError = orderService.validateCheckoutPayload(
                { userType, phone, email, tin, companyName },
                Boolean(fileFromForm?.size)
            );
            if (validationError) {
                return ctx.badRequest(validationError);
            }

            let fileId: number | null = null;
            if (fileFromForm && fileFromForm.size > 0) {
                const uploadService =
                    strapi.plugins["upload"].service("upload");
                const [uploaded] = await uploadService.upload(
                    {
                        data: { fileInfo: {} },
                        files: fileFromForm,
                    },
                    { user: ctx.state.user ?? undefined }
                );
                fileId = uploaded?.id ?? null;
            }

            const { entities: productsEntities, error: productsError } =
                await orderService.getProductEntitiesAndValidateNotSold(
                    products
                );
            if (productsError) {
                return ctx.badRequest(productsError);
            }

            const orderData = orderService.createOrderData(
                products,
                {
                    userName,
                    phone,
                    email,
                    address,
                    userType,
                    tin,
                    companyName,
                    comment,
                    paymentMethod,
                },
                fileId
            );

            const order = await strapi.entityService.create(
                "api::order-v1.order-v1",
                {
                    data: orderData,
                    populate: ["products.product"],
                }
            );

            // await orderService.markProductsAsSold(products);

            const totalAmount =
                orderService.calculateOrderTotal(productsEntities);

            if (paymentMethod === "online") {
                try {
                    const { checkout, expiresAt } = await checkoutV1(
                        user,
                        order,
                        "Заказ номер " + order.id,
                        totalAmount
                    );

                    await strapi.entityService.update(
                        "api::order-v1.order-v1",
                        order.id,
                        {
                            data: {
                                checkoutToken: checkout.token as string,
                                checkoutExpiresAt: expiresAt,
                            },
                        }
                    );
                    return { data: { order, checkout } };
                } catch (error) {
                    try {
                        await orderService.removeExpiredUnpaidOrder(order);
                    } catch (cleanupErr) {
                        console.error(
                            "order-v1 checkout: failed to remove order after checkoutV1 error",
                            cleanupErr
                        );
                    }
                    throw error;
                }
            } else {
                await orderService.sendOrderConfirmationEmail(
                    email,
                    order,
                    totalAmount
                );
            }

            return { data: { order, checkout: null } };
        },

        async notification(ctx) {
            const { uid, status, amount, customer } =
                ctx.request.body.transaction || {};
            const { orderId } = ctx.query;
            const orderService = strapi.service("api::order-v1.order-v1");
            const order = await strapi.entityService.findOne(
                "api::order-v1.order-v1",
                orderId,
                { populate: ["products.product"] }
            );
            if (!order) {
                if (status === "successful") {
                    console.error(
                        "order-v1 notification: successful payment but order row missing (possible cleanup race); reconcile via bepaid",
                        {
                            orderId,
                            transactionUid: uid,
                            amount,
                            customerEmail: customer?.email,
                        }
                    );
                }
                return ctx.badRequest("Order not found");
            }
            if (status === "successful" && customer?.email) {
                await strapi.entityService.update(
                    "api::order-v1.order-v1",
                    orderId,
                    {
                        data: {
                            transactionId: uid,
                            checkoutToken: null,
                            checkoutExpiresAt: null,
                            paymentStatus: "paid",
                        },
                    }
                );

                try {
                    await strapi
                        .service("api::shopping-cart.shopping-cart")
                        .removeOrderedItemsFromShoppingCart(
                            customer.email,
                            orderId
                        );
                } catch (error) {
                    console.error("Error removing shopping-cart items:", error);
                }

                const totalAmountByn = amount / 100;
                await orderService.sendOrderConfirmationEmail(
                    customer.email,
                    order,
                    totalAmountByn
                );

                return { data: { success: true } };
            }
            if (status === "expired") {
                await orderService.removeExpiredUnpaidOrder(order);
                return { data: { success: true } };
            }
            return { data: { success: false } };
        },

        async cancel(ctx) {
            const orderService = strapi.service("api::order-v1.order-v1");
            const token = ctx.request.body.token;
            if (!token) {
                return ctx.badRequest("Token is required");
            }
            const trimmedToken = token.trim();
            const result = await orderService.cancelOrderByCheckoutToken(
                trimmedToken
            );
            if (!result.success) {
                return ctx.badRequest(result.error ?? "Cancel failed");
            }
            return { data: { success: true } };
        },

        async reissueCheckoutToken(ctx) {
            const orderService = strapi.service("api::order-v1.order-v1");
            const { token, orderId } = ctx.request.body;

            if (!token) {
                return ctx.badRequest("Token is required");
            }
            if (!orderId) {
                return ctx.badRequest("Valid orderId is required");
            }

            const [order] = await strapi.entityService.findMany(
                "api::order-v1.order-v1",
                {
                    filters: {
                        id: orderId,
                        checkoutToken: token,
                    },
                    populate: ["products.product"],
                }
            );

            if (!order) {
                return ctx.badRequest("Order not found");
            }
            if (order.paymentMethod !== "online") {
                return ctx.badRequest("Order is not an online payment order");
            }
            if (order.paymentStatus === "paid") {
                return ctx.badRequest("Order is already paid");
            }

            const productsEntities = (order.products ?? [])
                .map((p) => p.product)
                .filter(Boolean);

            const totalAmount =
                orderService.calculateOrderTotal(productsEntities);

            try {
                const { checkout, expiresAt } = await checkoutV1(
                    ctx.state.user,
                    order,
                    "Заказ номер " + order.id,
                    totalAmount
                );
                await strapi.entityService.update(
                    "api::order-v1.order-v1",
                    order.id,
                    {
                        data: {
                            checkoutToken: checkout.token,
                            checkoutExpiresAt: expiresAt,
                        },
                    }
                );
                return { data: { checkout } };
            } catch (error) {
                console.error("order-v1 reissueCheckoutToken failed", {
                    orderId: order.id,
                    error,
                });
                throw error;
            }
        },
    })
);
