/**
 * tire router.
 */

import { factories } from "@strapi/strapi";
//@ts-ignore
export default factories.createCoreRouter("api::tire.tire", {
    config: {
        find: { middlewares: ["global::price-middleware"] },
        findOne: { middlewares: ["global::price-middleware"] },
    },
});
