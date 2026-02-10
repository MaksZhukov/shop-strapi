/**
 *  order controller
 */

import { factories } from "@strapi/strapi";
import { checkoutV1 } from "../../../services/bepaid";

const PRODUCT_API_UID_BY_TYPE = {
    cabin: "api::cabin.cabin",
    wheel: "api::wheel.wheel",
    tire: "api::tire.tire",
    sparePart: "api::spare-part.spare-part",
};

const COMPONENT_PRODUCT_TYPE = {
    sparePart: "spare-part",
};

export default factories.createCoreController(
    "api::order-v1.order-v1",
    ({ strapi }) => ({
        async checkout(ctx) {
            const user = ctx.state.user;

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

            const productsEntities = await Promise.all(
                products.map((item) =>
                    strapi.db
                        .query(PRODUCT_API_UID_BY_TYPE[item.type])
                        .findOne({ where: { id: item.id } })
                )
            );
            if (productsEntities.some((item) => item.sold)) {
                return ctx.badRequest("one of the product is sold");
            }

            const order = await strapi.entityService.create(
                "api::order-v1.order-v1",
                {
                    data: {
                        username: userName,
                        phone: phone,
                        email: email,
                        address: address,
                        userType: userType,
                        tin: tin,
                        companyName: companyName,
                        comment: comment,
                        file: fileId,
                        paymentMethod: paymentMethod,
                        paymentStatus: "pending",
                        products: products.map((item) => ({
                            __component: `product.${
                                COMPONENT_PRODUCT_TYPE[item.type] || item.type
                            }`,
                            product: item.id,
                        })),
                    },
                }
            );
            products.forEach((item) => {
                strapi.db.query(PRODUCT_API_UID_BY_TYPE[item.type]).update({
                    where: { id: item.id },
                    data: { sold: true },
                });
            });

            const totalAmount = productsEntities.reduce(
                (prev, curr) => prev + (curr.discountPrice || curr.price),
                0
            );
            if (paymentMethod === "online") {
                const data = await checkoutV1(
                    user,
                    order,
                    "Заказ номер " + order.id,
                    totalAmount
                );
                return { data: { order: order, checkout: data } };
            }
            return { data: { order: order, checkout: null } };
        },

        async notification(ctx) {
            const { uid, status, amount, description, customer } =
                ctx.request.body.transaction || {};
            const { orderId } = ctx.query;
            if (status === "successful") {
                await strapi.entityService.update(
                    "api::order-v1.order-v1",
                    orderId,
                    {
                        data: {
                            transactionId: uid,
                            paymentStatus: "paid",
                        },
                    }
                );

                if (customer?.email) {
                    try {
                        await strapi
                            .service("api::shopping-cart.shopping-cart")
                            .removeOrderedItemsFromShoppingCart(
                                customer.email,
                                orderId
                            );
                    } catch (error) {
                        console.error(
                            "Error removing shopping-cart items:",
                            error
                        );
                    }
                }

                if (customer.email) {
                    strapi.plugins.email.services.email.send({
                        to: customer.email,
                        from: strapi.plugins.email.config(
                            "providerOptions.username"
                        ),
                        subject: "Заказ #" + orderId + " на razbor-auto.by",
                        html: `<b>Товар</b>: ${description}<br>
                        <b>Стоимость</b>: ${(amount / 100).toFixed(2)} BYN<br> 
                        `,
                    });
                }

                return { data: { success: true } };
            }
            if (status === "expired") {
                await strapi
                    .service("api::order-v1.order-v1")
                    .removeExpiredUnpaidOrderById(+orderId);

                return { data: { success: true } };
            }
            return { data: { success: false } };
        },
    })
);
