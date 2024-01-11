/**
 * car-on-parts router
 */

import { factories } from "@strapi/strapi";
//@ts-ignore
export default factories.createCoreRouter("api::car-on-parts.car-on-parts", {
    config: {
        find: { middlewares: ["global::price-middleware"] },
        findOne: { middlewares: ["global::price-middleware"] },
    },
});
