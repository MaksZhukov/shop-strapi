/**
 * cabin controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::cabin.cabin",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            console.log(id);
            const entity = await strapi.db.query("api::cabin.cabin").findOne({
                where: { $or: [{ slug: id }, { id }] },
                populate: [
                    "images",
                    "kindSparePart",
                    "model",
                    "brand",
                    "seo.images",
                    "snippets",
                ],
            });
            return this.transformResponse(entity);
        },
    })
);
