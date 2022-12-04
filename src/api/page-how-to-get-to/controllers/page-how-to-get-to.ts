/**
 * page-how-to-get-to controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::page-how-to-get-to.page-how-to-get-to",
    () => ({
        find(ctx) {
            ctx.query.populate = ["seo.images", "video"];
            return super.find(ctx);
        },
    })
);
