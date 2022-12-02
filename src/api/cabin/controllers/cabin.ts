/**
 * cabin controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::cabin.cabin",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const entity = await strapi.db
                .query("api::spare-part.spare-part")
                .findOne({
                    where: { $or: [{ slug: id }, { id }] },
                    populate: [
                        "images",
                        "kindSparePart",
                        "model",
                        "brand",
                        "generation",
                        "seo.images",
                        "snippets",
                    ],
                });
            return this.transformResponse(entity);
        },
    })
);
