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
                    usersPermissionsUser: userId,
                },
            };
            const result = await super.find(ctx);
            const { data } = strapi
                .service("plugin::transformer.transformService")
                //@ts-ignore
                .response(
                    strapi.services[
                        "plugin::transformer.settingsService"
                    ].get(),
                    result
                );
            return {
                data: data.map((item) => ({
                    ...item,
                    product: item.product[0].product,
                })),
            };
        },
        async create(ctx) {
            const userId = ctx.state.user.id;
            ctx.query = { populate: ["product.product.images"] };
            ctx.request.body.data.usersPermissionsUser = userId;
            const result = await super.create(ctx);
            const { data } = strapi
                .service("plugin::transformer.transformService")
                //@ts-ignore
                .response(
                    strapi.services[
                        "plugin::transformer.settingsService"
                    ].get(),
                    result
                );
            return { data: { ...data, product: data.product[0].product } };
        },
        async delete(ctx) {
            const userId = ctx.state.user.id;
            ctx.request.body = { data: { usersPermissionsUser: userId } };
            return await super.delete(ctx);
        },
    })
);
