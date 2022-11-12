/**
 * page-review controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::page-review.page-review",
    () => ({
        find(ctx) {
            ctx.query.populate = "seo.images";
            return super.find(ctx);
        },
    })
);
