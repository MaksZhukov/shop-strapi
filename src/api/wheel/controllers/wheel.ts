/**
 *  wheel controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::wheel.wheel",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const entity = await strapi.db.query("api::wheel.wheel").findOne({
                where: { $or: [{ slug: id }, { id }] },
                populate: [
                    "images",
                    "model",
                    "brand",
                    "seo.images",
                    "snippets",
                ],
            });

            return this.transformResponse(entity);
        },
    })
);
