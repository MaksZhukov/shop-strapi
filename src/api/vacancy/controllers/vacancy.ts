/**
 * vacancy controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::vacancy.vacancy",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const entity = await strapi.db
                .query("api::vacancy.vacancy")
                .findOne({
                    where: { $or: [{ slug: id }, { id }] },
                    populate: ["image", "seo.images"],
                });
            return this.transformResponse(entity);
        },
    })
);
