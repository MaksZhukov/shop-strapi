export default (config, { strapi }) => {
    return async (context, next) => {
        if (
            context.req.method === "GET" &&
            context.req.url.includes("/brands")
        ) {
            if (context.query?.pagination?.limit) {
                strapi.config.api.rest.maxLimit =
                    context.query.pagination.limit;
            }
        }
        await next();
        strapi.config.api.rest.maxLimit = process.env.DEFAULT_REST_MAX_LIMIT;
    };
};
