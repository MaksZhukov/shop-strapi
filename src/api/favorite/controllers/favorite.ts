/**
 *  favorite controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::favorite.favorite',
    // @ts-ignore
    ({ strapi }) => ({
        async find(ctx) {
            const userId = ctx.state.user.id;
            ctx.query = {
                populate: "product",
                filters: {
                    users_permissions_user: userId,
                },
            };
            return await super.find(ctx);
        },
        async create(ctx) {
            const userId = ctx.state.user.id;
            ctx.request.body.data.users_permissions_user = userId;
            return await super.create(ctx);
        },
        async delete(ctx) {
            const { id } = ctx.params;
            const userId = ctx.state.user.id;
            if (
                await strapi.db.query("api::favorite.favorite").findOne({
                    where: {
                        id,
                        users_permissions_user: userId,
                    },
                })
            ) {
                return await super.delete(ctx);
            }
        }
    })
);
