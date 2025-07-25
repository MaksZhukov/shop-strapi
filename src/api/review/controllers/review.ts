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
            const reviews = await strapi.entityService.findMany(
                "api::review.review",
                {
                    filters: {
                        //@ts-expect-error error
                        email: ctx.query.email,
                    },
                }
            );
            const review = reviews[0];
            let status = !review
                ? ""
                : //@ts-expect-error error
                review.publishedAt
                ? "published"
                : "draft";

            return this.transformResponse({ status });
        },
    })
);
