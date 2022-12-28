/**
 * cabin controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::cabin.cabin",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const { populate } = ctx.query;
            const entity = await strapi.db.query("api::cabin.cabin").findOne({
                where: { $or: [{ slug: id }, { id }] },
                populate,
            });
            return this.transformResponse(entity);
        },
    })
);
