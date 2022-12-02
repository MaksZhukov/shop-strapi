/**
 * cabin router
 */

import { factories } from "@strapi/strapi";

//@ts-ignore
export default factories.createCoreRouter("api::cabin.cabin", {
    config: {
        find: { middlewares: ["global::priceUSD-middleware"] },
        findOne: { middlewares: ["global::priceUSD-middleware"] },
    },
});
