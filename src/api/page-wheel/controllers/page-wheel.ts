/**
 * page-wheel controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::page-wheel.page-wheel",
    () => ({
        find(ctx) {
            ctx.query.populate = "*";
            return super.find(ctx);
        },
    })
);
