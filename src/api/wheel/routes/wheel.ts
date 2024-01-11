/**
 * wheel router.
 */

import { factories } from "@strapi/strapi";

//@ts-ignore
export default factories.createCoreRouter("api::wheel.wheel", {
    config: {
        find: { middlewares: ["global::price-middleware"] },
        findOne: { middlewares: ["global::price-middleware"] },
    },
});
