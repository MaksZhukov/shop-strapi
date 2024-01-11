/**
 * cabin router
 */

import { factories } from "@strapi/strapi";

//@ts-ignore
export default factories.createCoreRouter("api::cabin.cabin", {
    config: {
        find: { middlewares: ["global::price-middleware"] },
        findOne: { middlewares: ["global::price-middleware"] },
    },
});
