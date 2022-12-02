/**
 * service-station controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::service-station.service-station",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const entity = await strapi.db
                .query("api::service-station.service-station")
                .findOne({
                    where: { $or: [{ slug: id }, { id }] },
                    populate: ["image", "seo.images"],
                });
            return this.transformResponse(entity);
        },
    })
);
