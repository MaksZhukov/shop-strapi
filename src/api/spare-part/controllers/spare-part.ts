/**
 *  spare-part controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::spare-part.spare-part",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const { populate } = ctx.query;
            const entity = await strapi.db
                .query("api::spare-part.spare-part")
                .findOne({
                    where: { $or: [{ slug: id }, { id }] },
                    populate,
                });
            return this.transformResponse(entity);
        },
    })
);
