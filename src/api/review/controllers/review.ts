/**
 *  review controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
    "api::review.review",
    ({ strapi }) => ({
        async create(ctx) {
            ctx.request.body.data.publishedAt = null;
            return super.create(ctx);
        },
        async checkStatus(ctx) {
            const reviews = await strapi
                .documents("api::review.review")
                .findMany({
                    filters: {
                        email: ctx.query.email as string,
                    } as any,
                });
            const review = reviews[0];
            let status = !review
                ? ""
                : review.publishedAt
                ? "published"
                : "draft";

            return this.transformResponse({ status });
        },
    })
);
