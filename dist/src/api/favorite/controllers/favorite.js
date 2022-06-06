"use strict";
/**
 *  favorite controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::favorite.favorite", 
//@ts-ignore
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
        })) {
            return await super.delete(ctx);
        }
    },
}));
