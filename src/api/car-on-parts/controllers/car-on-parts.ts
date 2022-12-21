/**
 * car-on-parts controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::car-on-parts.car-on-parts",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const entity = await strapi.db
                .query("api::car-on-parts.car-on-parts")
                .findOne({
                    where: { $or: [{ slug: id }, { id }] },
                    populate: [
                        "images",
                        "model",
                        "brand",
                        "generation",
                        "volume",
                        "seo.images",
                    ],
                });
            if (entity) {
                const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
                return this.transformResponse(sanitizedEntity);
            }
        },
    })
);
