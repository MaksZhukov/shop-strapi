/**
 * wheel router.
 */

import { factories } from "@strapi/strapi";

//@ts-ignore
export default factories.createCoreRouter("api::wheel.wheel", {
    config: {
        find: { middlewares: ["global::priceUSD-middleware"] },
        findOne: { middlewares: ["global::priceUSD-middleware"] },
    },
});
