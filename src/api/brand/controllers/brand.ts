/**
 *  brand controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::brand.brand",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const { populate } = ctx.query;
            const entity = await strapi.db.query("api::brand.brand").findOne({
                where: { $or: [{ slug: id }, { id }] },
                populate: populate,
            });
            return this.transformResponse(entity);
        },
    })
);
