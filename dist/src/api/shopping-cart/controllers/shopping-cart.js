"use strict";
/**
 *  shopping-cart controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::shopping-cart.shopping-cart", ({ strapi }) => ({
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
    async delete(ctx) {
        const { id } = ctx.params;
        const userId = ctx.state.user.id;
        if (
        //@ts-ignore
        await strapi.db.query("api::shopping-cart.shopping-cart").findOne({
            where: {
                id,
                users_permissions_user: userId,
            },
        })) {
            return await super.delete(ctx);
        }
    },
}));
