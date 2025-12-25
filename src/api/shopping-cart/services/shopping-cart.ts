/**
 * shopping-cart service.
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
    "api::shopping-cart.shopping-cart",
    ({ strapi }) => ({
        async removeOrderedItemsFromShoppingCart(
            customerEmail: string,
            orderId: number
        ) {
            try {
                const user = await strapi.db
                    .query("plugin::users-permissions.user")
                    .findOne({
                        where: { email: customerEmail },
                    });

                if (!user) {
                    return;
                }

                const order = await strapi.entityService.findOne(
                    "api::order.order",
                    orderId,
                    {
                        populate: ["products"],
                    }
                );

                if (
                    !order ||
                    !order.products ||
                    !Array.isArray(order.products)
                ) {
                    return;
                }

                const orderedProductUids = order.products.map(
                    (productComponent: any) => {
                        const productId =
                            typeof productComponent.product === "object"
                                ? productComponent.product?.id
                                : productComponent.product;
                        return `${productComponent.__component}-${productId}`;
                    }
                );

                if (orderedProductUids.length > 0) {
                    await strapi.db.entityManager.deleteMany(
                        "api::shopping-cart.shopping-cart",
                        {
                            filters: {
                                user: user.id,
                                uid: {
                                    $in: orderedProductUids,
                                },
                            },
                        }
                    );
                }
            } catch (error) {
                console.error("Error removing shopping-cart items:", error);
                throw error;
            }
        },
    })
);
