/**
 * contact controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController("api::contact.contact", () => ({
    find(ctx) {
        ctx.query.populate = "*";
        return super.find(ctx);
    },
}));
