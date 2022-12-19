/**
 *  tire-brand controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::tire-brand.tire-brand",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const { populate } = ctx.query;
            const entity = await strapi.db
                .query("api::tire-brand.tire-brand")
                .findOne({
                    where: { $or: [{ slug: id }, { id }] },
                    populate: populate,
                });
            return this.transformResponse(entity);
        },
    })
);
