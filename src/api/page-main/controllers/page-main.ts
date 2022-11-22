/**
 * page-main controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::page-main.page-main",
    () => ({
        find(ctx) {
            ctx.query.populate = [
                "autocomises.image",
                "banner",
                "seo.images",
                "advertising.image",
                "discounts.image",
                "deliveryAuto.image",
            ];
            return super.find(ctx);
        },
    })
);
