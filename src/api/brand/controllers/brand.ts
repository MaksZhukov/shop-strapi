/**
 *  brand controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::brand.brand",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const { populate, field = "id" } = ctx.query;
            const entity = await strapi.db.query("api::brand.brand").findOne({
                where: { [field as string]: id },
                populate: populate,
            });
            return this.transformResponse(entity);
        },
    }),
);
