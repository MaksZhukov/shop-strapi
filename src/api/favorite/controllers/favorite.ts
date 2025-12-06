/**
 *  favorite controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::favorite.favorite",
    //@ts-ignore
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
            const { data, meta } = await super.find(ctx);
            return {
                data: data
                    .filter(
                        (item) =>
                            !item.attributes.product[0].product.data.attributes
                                .sold
                    )
                    .map((item) => {
                        return {
                            ...item,
                            attributes: {
                                ...item.attributes,
                                product:
                                    item.attributes.product[0].product.data,
                            },
                        };
                    }),
                meta,
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
                await strapi.db.query("api::favorite.favorite").findOne({
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
            const { ids } = ctx.query;
            const userId = ctx.state.user.id;
            const result = await strapi.db.entityManager.deleteMany(
                "api::favorite.favorite",
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
