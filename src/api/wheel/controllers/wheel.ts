/**
 *  wheel controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::wheel.wheel",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const { populate } = ctx.query;
            const entity = await strapi.db.query("api::wheel.wheel").findOne({
                where: { $or: [{ slug: id }, { id }] },
                populate,
            });

            return this.transformResponse(entity);
        },
    })
);
