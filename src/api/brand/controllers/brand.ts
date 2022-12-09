/**
 *  brand controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::brand.brand",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            console.log(id);
            const entity = await strapi.db.query("api::brand.brand").findOne({
                where: { $or: [{ name: id }, { id }] },
                populate: ["image", "seo.images"],
            });
            return this.transformResponse(entity);
        },
    })
);
