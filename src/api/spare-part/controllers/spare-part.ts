/**
 *  spare-part controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::spare-part.spare-part",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const entity = await strapi.db
                .query("api::spare-part.spare-part")
                .findOne({
                    where: { $or: [{ slug: id }, { id }] },
                    populate: ["images", "sparePart", "model", "brand"],
                });
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return this.transformResponse(sanitizedEntity);
        },
    })
);
