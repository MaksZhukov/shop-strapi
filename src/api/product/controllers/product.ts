/**
 *  product controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::product.product",
    //@ts-ignore
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            //@ts-ignore
            const entity = await strapi.db.query("api::product.product").findOne({
                where: { $or: [{ slug: id }, { id }] },
            });
            const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
            return this.transformResponse(sanitizedEntity);
        },
    })
);
