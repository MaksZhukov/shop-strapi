/**
 * page-contact controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::page-contact.page-contact",
    () => ({
        find(ctx) {
            ctx.query.populate = "*";
            return super.find(ctx);
        },
    })
);
