/**
 * page-tire controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::page-tire.page-tire",
    () => ({
        find(ctx) {
            ctx.query.populate = "*";
            return super.find(ctx);
        },
    })
);
