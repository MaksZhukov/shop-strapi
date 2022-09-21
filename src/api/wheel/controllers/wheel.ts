/**
 *  wheel controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::wheel.wheel",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const entity = await strapi.db.query("api::wheel.wheel").findOne({
                where: { $or: [{ slug: id }, { id }] },
                populate: ["images", "sparePart", "model", "brand"],
            });
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return this.transformResponse(sanitizedEntity);
        },
    })
);
