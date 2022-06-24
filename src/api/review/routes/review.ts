/**
 * review router.
 */

import { factories } from "@strapi/strapi";

const defaultRouter = factories.createCoreRouter("api::review.review");

const customRouter = {
    get prefix() {
        return defaultRouter.prefix;
    },
    get routes() {
        return [
            {
                method: "GET",
                path: "/reviews/check",
                handler: "api::review.review.checkStatus",
                config: {
                    auth: false,
                },
            },
        ].concat(defaultRouter.routes);
    },
};

export default customRouter;
