/**
 * order-v1 service.
 */

import { factories } from "@strapi/strapi";
import { ORDER_EXPIRED_TIME } from "../../../services/bepaid";

const PRODUCT_API_UID_BY_TYPE = {
    cabin: "api::cabin.cabin",
    wheel: "api::wheel.wheel",
    tire: "api::tire.tire",
    sparePart: "api::spare-part.spare-part",
};

const COMPONENT_PRODUCT_TYPE: Record<string, string> = {
    sparePart: "spare-part",
};

export default factories.createCoreService(
    "api::order-v1.order-v1",
    ({ strapi }) => ({
        async cleanupExpiredUnpaidOrders() {
            try {
                const expiredAt = new Date(Date.now() - ORDER_EXPIRED_TIME);

                const expiredOrders = await strapi.entityService.findMany(
                    "api::order-v1.order-v1",
                    {
                        filters: {
                            paymentMethod: "online",
                            paymentStatus: { $ne: "paid" },
                            createdAt: { $lt: expiredAt },
                        },
                        populate: ["products.product"],
                    }
                );

                for (const order of expiredOrders) {
                    await this.removeExpiredUnpaidOrder(order);
                }

                if (expiredOrders.length > 0) {
                    console.log(
                        `Cleaned up ${expiredOrders.length} expired unpaid order-v1(s)`
                    );
                }
            } catch (err) {
                console.error("Error in cleanupExpiredUnpaidOrders:", err);
            }
        },

        async cancelOrderByCheckoutToken(
            token: string
        ): Promise<{ success: boolean; error?: string }> {
            if (
                !token ||
                typeof token !== "string" ||
                token.trim().length === 0
            ) {
                return { success: false, error: "Token is required" };
            }
            const orders = await strapi.entityService.findMany(
                "api::order-v1.order-v1",
                {
                    filters: {
                        checkoutToken: token,
                        paymentMethod: "online",
                        paymentStatus: { $ne: "paid" },
                    },
                    populate: ["products.product"],
                    limit: 1,
                }
            );
            const order = orders?.[0];
            if (!order) {
                return {
                    success: false,
                    error: "Order not found or already paid",
                };
            }
            await this.removeExpiredUnpaidOrder(order);
            return { success: true };
        },

        async removeExpiredUnpaidOrder(order) {
            try {
                const products = order.products
                    .map((product) => product.product)
                    .flat();

                await this.revertProductsSoldStatus(products);
                try {
                    await strapi.entityService.delete(
                        "api::order-v1.order-v1",
                        order.id
                    );
                    console.log(`Order-v1 ${order.id} removed successfully`);
                } catch (err) {
                    console.error(`Error deleting order-v1 ${order.id}:`, err);
                    throw err;
                }
            } catch (err) {
                console.error(
                    `Error in removeExpiredUnpaidOrder for order-v1 ${order.id}:`,
                    err
                );
                throw err;
            }
        },

        validateCheckoutPayload(
            body: {
                userType?: string;
                phone?: string;
                email?: string;
                tin?: string;
                companyName?: string;
            },
            hasFile: boolean
        ): string | null {
            const { userType, phone, email, tin, companyName } = body;
            if (!userType || !phone || !email) {
                return "userType, phone and email are required";
            }
            if (userType === "legal") {
                if (!tin || !companyName || !hasFile) {
                    return "tin and companyName are required";
                }
            }
            if (userType === "individual") {
                if (!phone) {
                    return "phone is required";
                }
            }
            return null;
        },

        async getProductEntitiesAndValidateNotSold(
            products: { type: string; id: number }[]
        ) {
            const entities = await Promise.all(
                products.map((item) =>
                    strapi.db
                        .query(
                            PRODUCT_API_UID_BY_TYPE[
                                item.type as keyof typeof PRODUCT_API_UID_BY_TYPE
                            ]
                        )
                        .findOne({ where: { id: item.id } })
                )
            );
            if (entities.some((item) => item?.sold)) {
                return { entities: null, error: "one of the product is sold" };
            }
            return { entities, error: null };
        },

        createOrderData(
            products: { type: string; id: number }[],
            data: {
                userName: string;
                phone: string;
                email: string;
                address?: string;
                userType: string;
                tin?: string;
                companyName?: string;
                comment?: string;
                paymentMethod: string;
            },
            fileId: number | null
        ) {
            return {
                username: data.userName,
                phone: data.phone,
                email: data.email,
                address: data.address,
                userType: data.userType,
                tin: data.tin,
                companyName: data.companyName,
                comment: data.comment,
                file: fileId,
                paymentMethod: data.paymentMethod,
                paymentStatus: "pending",
                products: products.map((item) => ({
                    __component: `product.${
                        COMPONENT_PRODUCT_TYPE[item.type] || item.type
                    }`,
                    product: item.id,
                })),
            };
        },

        calculateOrderTotal(
            productsEntities: Array<{ price?: number; discountPrice?: number }>
        ) {
            return productsEntities.reduce(
                (prev, curr) => prev + (curr.discountPrice ?? curr.price ?? 0),
                0
            );
        },

        async markProductsAsSold(products: { type: string; id: number }[]) {
            for (const item of products) {
                const apiUid =
                    PRODUCT_API_UID_BY_TYPE[
                        item.type as keyof typeof PRODUCT_API_UID_BY_TYPE
                    ];
                if (apiUid) {
                    await strapi.db.query(apiUid).update({
                        where: { id: item.id },
                        data: { sold: true },
                    });
                }
            }
        },

        async revertProductsSoldStatus(products) {
            for (const item of products) {
                const apiUid =
                    PRODUCT_API_UID_BY_TYPE[
                        item.type as keyof typeof PRODUCT_API_UID_BY_TYPE
                    ];
                if (apiUid) {
                    try {
                        await strapi.db.query(apiUid).update({
                            where: { id: item.id },
                            data: { sold: false },
                        });
                    } catch (err) {
                        console.error(
                            `Error reverting sold status for product ${item.id} of type ${item.type}:`,
                            err
                        );
                    }
                }
            }
        },

        getOrderProductsForEmail(order: {
            products?: Array<{ product: unknown }>;
        }) {
            return (order.products ?? [])
                .map((p) => p.product)
                .filter(Boolean) as Array<{
                name?: string;
                price?: number;
                discountPrice?: number;
            }>;
        },

        async sendOrderConfirmationEmail(
            to: string,
            order: { id: number; products?: Array<{ product: unknown }> },
            totalAmountByn: number
        ) {
            const products = this.getOrderProductsForEmail(order);
            const from = strapi.plugins.email.config(
                "providerOptions.username"
            );
            const lines = products
                .map(
                    (product) =>
                        `<b>${product.name}</b> - ${
                            product.discountPrice || product.price || 0
                        } BYN`
                )
                .join("<br>");
            try {
                await strapi.plugins.email.services.email.send({
                    to,
                    from,
                    subject: "Заказ #" + order.id + " на razbor-auto.by",
                    html: `<b>Товары:</b><br> 
                    ${lines}
                    <br><b>Стоимость заказа</b>: ${totalAmountByn.toFixed(
                        2
                    )} BYN<br>`,
                });
                console.log(`Order confirmation email sent to ${to}`);
            } catch (error) {
                console.error("Error sending order confirmation email:", error);
            }
        },
    })
);
