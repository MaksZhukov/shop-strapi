/**
 *  tire controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::tire.tire",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const entity = await strapi.db.query("api::tire.tire").findOne({
                where: { $or: [{ slug: id }, { id }] },
                populate: ["images", "brand", "seo.images"],
            });
            return this.transformResponse(entity);
        },
    })
);
