/**
 * autocomis controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::autocomis.autocomis",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const entity = await strapi.db
                .query("api::autocomis.autocomis")
                .findOne({
                    where: { $or: [{ slug: id }, { id }] },
                    populate: ["image", "seo.images"],
                });
            return this.transformResponse(entity);
        },
    })
);
