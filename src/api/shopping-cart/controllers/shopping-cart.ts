/**
 *  shopping-cart controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::shopping-cart.shopping-cart",
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
            const { id } = ctx.params;
            const userId = ctx.state.user.id;
            if (
                await strapi.db
                    .query("api::shopping-cart.shopping-cart")
                    .findOne({
                        where: {
                            id,
                            usersPermissionsUser: userId,
                        },
                    })
            ) {
                return super.delete(ctx);
            }
        },
        async deleteMany(ctx) {
            const userId = ctx.state.user.id;
            const items = await strapi.entityService.findMany(
                "api::shopping-cart.shopping-cart",
                {
                    filters: {
                        usersPermissionsUser: userId,
                    },
                }
            );
            const result = await strapi.entityService.deleteMany(
                "api::shopping-cart.shopping-cart",
                {
                    filters: {
                        id: {
                            $in: items.map((item) => item.id),
                        },
                    },
                }
            );
            return this.transformResponse(result);
        },
    })
);
