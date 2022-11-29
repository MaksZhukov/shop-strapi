/**
 * page-article controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::page-article.page-article",
    () => ({
        find(ctx) {
            ctx.query.populate = "seo.images";
            return super.find(ctx);
        },
    })
);
