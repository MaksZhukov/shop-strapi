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
                populate: ["spareParts", "wheels", "tires"],
                filters: {
                    usersPermissionsUser: userId,
                },
            };
            let { data } = await super.find(ctx);
            const sanitizedEntity = await this.sanitizeOutput(data[0], ctx);
            return this.transformResponse(sanitizedEntity);
        },
        async update(ctx) {
            const userId = ctx.state.user.id;
            ctx.query = { populate: { sparePart: { populate: "images" } } };
            ctx.request.body.data.usersPermissionsUser = userId;
            console.log(ctx.request.body);
            return await super.update(ctx);
        },
    })
);
