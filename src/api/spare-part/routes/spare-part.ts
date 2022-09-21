/**
 * spare-part router.
 */

import { factories } from "@strapi/strapi";

//@ts-ignore
export default factories.createCoreRouter("api::spare-part.spare-part", {
    config: {
        find: { middlewares: ["global::priceUSD-middleware"] },
        findOne: { middlewares: ["global::priceUSD-middleware"] },
    },
});
