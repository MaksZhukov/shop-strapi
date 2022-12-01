/**
 * page-car-dismantling-photo controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::page-car-dismantling-photo.page-car-dismantling-photo",
    () => ({
        find(ctx) {
            ctx.query.populate = ["images", "seo.images"];
            return super.find(ctx);
        },
    })
);
