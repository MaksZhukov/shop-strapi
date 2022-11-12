/**
 * page-shipping-and-payment controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::page-shipping-and-payment.page-shipping-and-payment",
    () => ({
        find(ctx) {
            ctx.query.populate = "seo.images";
            return super.find(ctx);
        },
    })
);
