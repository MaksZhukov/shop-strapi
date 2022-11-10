/**
 * page-spare-part controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::page-spare-part.page-spare-part",
    () => ({
        find(ctx) {
            ctx.query.populate = "*";
            return super.find(ctx);
        },
    })
);
