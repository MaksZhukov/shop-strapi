"use strict";
/**
 *  shopping-cart controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::shopping-cart.shopping-cart", ({ strapi }) => ({
    find(ctx) {
        const userId = ctx.state.user.id;
        ctx.query = {
            populate: "product",
            filters: {
                users_permissions_user: userId,
            },
        };
        return super.find(ctx);
    },
    create(ctx) {
        const userId = ctx.state.user.id;
        ctx.query = { populate: "product" };
        ctx.request.body.data.users_permissions_user = userId;
        ctx.request.body.data.uuid = `${userId}-${ctx.request.body.data.product}`;
        return super.create(ctx);
    },
    async delete(ctx) {
        const { id } = ctx.params;
        const userId = ctx.state.user.id;
        if (
        //@ts-ignore
        await strapi.db
            .query("api::shopping-cart.shopping-cart")
            .findOne({
            where: {
                id,
                users_permissions_user: userId,
            },
        })) {
            return super.delete(ctx);
        }
    },
    async deleteMany(ctx) {
        const userId = ctx.state.user.id;
        const items = await strapi.entityService.findMany("api::shopping-cart.shopping-cart", {
            filters: {
                users_permissions_user: userId,
            },
        });
        const result = await strapi.entityService.deleteMany("api::shopping-cart.shopping-cart", {
            filters: {
                id: {
                    $in: items.map((item) => item.id),
                },
            },
        });
        return this.transformResponse(result);
        // await strapi.entityService.
        //         .deleteMany("api::shopping-cart.shopping-cart",{
        //             where: {
        //                 users_permissions_user: userId,
        //             },
        //         })
    },
}));
