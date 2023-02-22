/**
 *  model controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::model.model",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const { filters = {}, populate, field = "id" } = ctx.query;
            const entity = await strapi.db.query("api::model.model").findOne({
                where: { [field]: id, ...filters },
                populate: populate,
            });
            return this.transformResponse(entity);
        },
    })
);
