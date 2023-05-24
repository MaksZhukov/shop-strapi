/**
 * new-article controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::new-article.new-article",
    ({ strapi }) => ({
        async findOne(ctx) {
            const { id } = ctx.params;
            const entity = await strapi.db
                .query("api::new-article.new-article")
                .findOne({
                    where: { $or: [{ slug: id }, { id }] },
                    populate: ["image", "seo.images"],
                });
            return this.transformResponse(entity);
        },
    })
);
