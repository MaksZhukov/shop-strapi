"use strict";
/**
 * review router.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
const defaultRouter = strapi_1.factories.createCoreRouter("api::review.review");
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
exports.default = customRouter;
