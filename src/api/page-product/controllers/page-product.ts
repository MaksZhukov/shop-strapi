/**
 * page-product controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::page-product.page-product",
    () => ({
        find(ctx) {
            ctx.query.populate = "linksWithImages.image";
            return super.find(ctx);
        },
    })
);
