"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const koa2_ratelimit_1 = require("koa2-ratelimit");
exports.default = (config, { strapi }) => async (context, next) => {
    return koa2_ratelimit_1.RateLimit.middleware({
        interval: 1 * 60 * 1000,
        max: 50,
        prefixKey: `${context.request.path}:${context.request.ip}`,
    })(context, next);
};
