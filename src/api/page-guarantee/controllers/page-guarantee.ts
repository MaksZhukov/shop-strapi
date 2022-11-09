/**
 * page-guarantee controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::page-guarantee.page-guarantee",
    () => ({
        find(ctx) {
            ctx.query.populate = "*";
            return super.find(ctx);
        },
    })
);
