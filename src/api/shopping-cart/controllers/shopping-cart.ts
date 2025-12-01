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
                    user: userId,
                },
            };
            const result = await super.find(ctx);
            return {
                ...result,
                data: result.data.map((item) => {
                    return {
                        ...item,
                        attributes: {
                            ...item.attributes,
                            product:
                                item.attributes.product[0]?.product?.data ||
                                null,
                        },
                    };
                }),
            };
        },

        async create(ctx) {
            const userId = ctx.state.user.id;
            ctx.query = { populate: ["product.product.images"] };
            ctx.request.body.data.user = userId;
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
                            user: userId,
                        },
                    })
            ) {
                return super.delete(ctx);
            }
        },
        async deleteMany(ctx) {
            const userId = ctx.state.user.id;
            const { ids } = ctx.query;
            const result = await strapi.db.entityManager.deleteMany(
                "api::shopping-cart.shopping-cart",
                {
                    filters: {
                        user: userId,
                        id: {
                            $in: ids,
                        },
                    },
                }
            );
            return this.transformResponse(result);
        },
    })
);
