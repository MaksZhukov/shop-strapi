/**
 * page-awaiting-car controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::page-awaiting-car.page-awaiting-car",
    () => ({
        find(ctx) {
            ctx.query.populate = "*";
            return super.find(ctx);
        },
    })
);
