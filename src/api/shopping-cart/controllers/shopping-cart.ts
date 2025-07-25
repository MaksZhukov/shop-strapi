/**
 *  shopping-cart controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::shopping-cart.shopping-cart",
    ({ strapi }) => ({
        async find(ctx) {
            const userId = ctx.state.user.id;
            ctx.query = {
                ...ctx.query,
                populate: "product.product.images",
                filters: {
                    usersPermissionsUser: userId,
                },
            };
            const result = await super.find(ctx);
            return {
                data: result.data.map((item) => {
                    return {
                        ...item,
                        attributes: {
                            ...item,
                            product: item.product[0].product.data,
                        },
                    };
                }),
            };
        },

        async create(ctx) {
            const userId = ctx.state.user.id;
            ctx.query = { populate: ["product.product.images"] };
            ctx.request.body.data.usersPermissionsUser = userId;
            const productId = ctx.request.body.data.product[0].product;
            ctx.request.body.data.uid = userId + "-" + productId;
            const result = await super.create(ctx);
            return {
                data: {
                    ...result.data,
                    attributes: {
                        ...result.data.attributes,
                        product: result.data.attributes.product[0].product.data,
                    },
                },
            };
        },
        async delete(ctx) {
            const { id } = ctx.params;
            const userId = ctx.state.user.id;
            if (
                await strapi.db
                    .query("api::shopping-cart.shopping-cart")
                    .findOne({
                        where: {
                            id,
                            usersPermissionsUser: userId,
                        },
                    })
            ) {
                return super.delete(ctx);
            }
        },
        async deleteMany(ctx) {
            const userId = ctx.state.user.id;
            const items = await strapi
                .documents("api::shopping-cart.shopping-cart")
                .findMany({
                    filters: {
                        usersPermissionsUser: userId,
                    },
                });

            if (Array.isArray(items) && items.length > 0) {
                const itemIds = items.map((item: any) => item.id);
                const result = await strapi.db
                    .query("api::shopping-cart.shopping-cart")
                    .deleteMany({
                        where: {
                            id: {
                                $in: itemIds,
                            },
                        },
                    });
                return this.transformResponse(result);
            }

            return this.transformResponse({ count: 0 });
        },
    })
);
