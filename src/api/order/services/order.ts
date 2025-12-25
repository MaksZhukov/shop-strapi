/**
 * order service.
 */

import { factories } from "@strapi/strapi";
import { ORDER_EXPIRED_TIME } from "../../../services/bepaid";

const PRODUCT_API_UID_BY_TYPE = {
    cabin: "api::cabin.cabin",
    wheel: "api::wheel.wheel",
    tire: "api::tire.tire",
    sparePart: "api::spare-part.spare-part",
};

const COMPONENT_TO_TYPE_MAP = {
    "product.spare-part": "sparePart",
    "product.tire": "tire",
    "product.wheel": "wheel",
    "product.cabin": "cabin",
};

export default factories.createCoreService(
    "api::order.order",
    ({ strapi }) => ({
        async cleanupExpiredUnpaidOrders() {
            try {
                const expiredAt = new Date(Date.now() - ORDER_EXPIRED_TIME);

                const expiredOrders = await strapi.entityService.findMany(
                    "api::order.order",
                    {
                        filters: {
                            paymentMethod: "online",
                            paymentStatus: { $ne: "paid" },
                            createdAt: { $lt: expiredAt },
                        },
                        populate: ["products"],
                    }
                );

                for (const order of expiredOrders) {
                    // Revert sold status for all products in the order
                    if (
                        (order as any).products &&
                        Array.isArray((order as any).products)
                    ) {
                        for (const productComponent of (order as any)
                            .products) {
                            const componentType = productComponent.__component;
                            const productType =
                                COMPONENT_TO_TYPE_MAP[componentType];
                            // Product ID is stored directly in the product field (not as a relation)
                            const productId =
                                typeof productComponent.product === "object"
                                    ? productComponent.product?.id
                                    : productComponent.product;

                            if (
                                productType &&
                                productId &&
                                PRODUCT_API_UID_BY_TYPE[productType]
                            ) {
                                try {
                                    await strapi.db
                                        .query(
                                            PRODUCT_API_UID_BY_TYPE[productType]
                                        )
                                        .update({
                                            where: { id: productId },
                                            data: { sold: false },
                                        });
                                } catch (err) {
                                    console.error(
                                        `Error reverting sold status for product ${productId} of type ${productType}:`,
                                        err
                                    );
                                }
                            }
                        }
                    }

                    // Delete the order
                    try {
                        await strapi.entityService.delete(
                            "api::order.order",
                            order.id
                        );
                    } catch (err) {
                        console.error(`Error deleting order ${order.id}:`, err);
                    }
                }

                if (expiredOrders.length > 0) {
                    console.log(
                        `Cleaned up ${expiredOrders.length} expired unpaid order(s)`
                    );
                }
            } catch (err) {
                console.error("Error in cleanupExpiredUnpaidOrders:", err);
            }
        },

        async removeExpiredUnpaidOrderById(orderId: number) {
            try {
                // Find the order with products populated
                const order = await strapi.entityService.findOne(
                    "api::order.order",
                    orderId,
                    {
                        populate: ["products"],
                    }
                );

                if (!order) {
                    console.error(`Order with id ${orderId} not found`);
                    return;
                }

                // Revert sold status for all products in the order
                if (order.products && Array.isArray(order.products)) {
                    for (const productComponent of order.products) {
                        const componentType = productComponent.__component;
                        const productType =
                            COMPONENT_TO_TYPE_MAP[componentType];
                        // Product ID is stored directly in the product field (not as a relation)
                        const productId =
                            typeof productComponent.product === "object"
                                ? productComponent.product?.id
                                : productComponent.product;

                        if (
                            productType &&
                            productId &&
                            PRODUCT_API_UID_BY_TYPE[productType]
                        ) {
                            try {
                                await strapi.db
                                    .query(PRODUCT_API_UID_BY_TYPE[productType])
                                    .update({
                                        where: { id: productId },
                                        data: { sold: false },
                                    });
                            } catch (err) {
                                console.error(
                                    `Error reverting sold status for product ${productId} of type ${productType}:`,
                                    err
                                );
                            }
                        }
                    }
                }

                try {
                    await strapi.entityService.delete(
                        "api::order.order",
                        orderId
                    );
                    console.log(`Order ${orderId} removed successfully`);
                } catch (err) {
                    console.error(`Error deleting order ${orderId}:`, err);
                    throw err;
                }
            } catch (err) {
                console.error(
                    `Error in removeOrderById for order ${orderId}:`,
                    err
                );
                throw err;
            }
        },
    })
);
