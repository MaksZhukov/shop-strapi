/**
 * A set of functions called "actions" for `products`
 */

export default {
    find: async (ctx, next) => {
        const products = (
            await Promise.all([
                strapi.service("api::spare-part.spare-part").find(ctx.query),
                strapi.service("api::cabin.cabin").find(ctx.query),
                strapi.service("api::wheel.wheel").find(ctx.query),
                strapi.service("api::tire.tire").find(ctx.query),
            ])
        ).reduce((prev, curr) => ({
            //@ts-expect-error error
            data: [...prev.data, ...curr.results],
            pagination: {},
        }));
        return products;
    },
};
