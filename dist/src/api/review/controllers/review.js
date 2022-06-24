"use strict";
/**
 *  review controller
 */
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController("api::review.review", ({ strapi }) => ({
    async create(ctx) {
        ctx.request.body.data.publishedAt = null;
        return super.create(ctx);
    },
    async checkStatus(ctx) {
        const [review] = await strapi.entityService.findMany("api::review.review", {
            filters: {
                email: ctx.query.email,
            },
        });
        let status = !review
            ? ""
            : review.publishedAt
                ? "published"
                : "draft";
        return this.transformResponse({ status });
    },
}));
