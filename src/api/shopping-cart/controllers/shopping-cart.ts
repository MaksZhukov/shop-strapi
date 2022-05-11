/**
 *  shopping-cart controller
 */


import { factories } from '@strapi/strapi'
// @ts-ignore
export default factories.createCoreController('api::shopping-cart.shopping-cart', () => ({
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
