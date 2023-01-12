/**
 *  car controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::car.car", ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params;
        const { populate } = ctx.query;
        const entity = await strapi.db.query("api::car.car").findOne({
            where: { $or: [{ slug: id }, { id }] },
            populate,
        });
        if (entity) {
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return this.transformResponse(sanitizedEntity);
        }
    },
}));
