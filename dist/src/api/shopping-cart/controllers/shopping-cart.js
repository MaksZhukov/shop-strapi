"use strict";
/**
 *  shopping-cart controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
// @ts-ignore
exports.default = strapi_1.factories.createCoreController('api::shopping-cart.shopping-cart', () => ({
    async find(ctx) {
        const userId = ctx.state.user.id;
        ctx.query = {
            populate: 'products',
            filters: {
                users_permissions_user: {
                    id: {
                        $eq: userId
                    }
                }
            }
        };
        let { data } = await super.find(ctx);
        return { data: data[0], meta: {} };
    }
}));
