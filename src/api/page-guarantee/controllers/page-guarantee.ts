/**
 * page-guarantee controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::page-guarantee.page-guarantee",
    () => ({
        find(ctx) {
            ctx.query.populate = "seo.images";
            return super.find(ctx);
        },
    })
);
