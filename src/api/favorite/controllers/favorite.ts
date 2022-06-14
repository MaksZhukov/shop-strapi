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
                populate: { product: { populate: "images" } },
                filters: {
                    users_permissions_user: userId,
                },
            };
            return await super.find(ctx);
        },
        async create(ctx) {
            const userId = ctx.state.user.id;
            ctx.query = { populate: "product" };
            ctx.request.body.data.users_permissions_user = userId;
            ctx.request.body.data.uuid = `${userId}-${ctx.request.body.data.product}`;
            return await super.create(ctx);
        },
        async delete(ctx) {
            const { id } = ctx.params;
            const userId = ctx.state.user.id;
            if (
                //@ts-ignore
                await strapi.db.query("api::favorite.favorite").findOne({
                    where: {
                        id,
                        users_permissions_user: userId,
                    },
                })
            ) {
                return await super.delete(ctx);
            }
        },
    })
);
