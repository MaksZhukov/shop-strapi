/**
 * guarantee controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::guarantee.guarantee",
    () => ({
        find(ctx) {
            ctx.query.populate = "*";
            return super.find(ctx);
        },
    })
);
