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
                populate: "*",
                filters: {
                    usersPermissionsUser: userId,
                },
            };
            return await super.find(ctx);
        },
        async update(ctx) {
            const userId = ctx.state.user.id;
            ctx.query = { populate: { sparePart: { populate: "images" } } };
            ctx.request.body.data.usersPermissionsUser = userId;
            return await super.update(ctx);
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
