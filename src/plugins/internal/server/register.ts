import type { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
    strapi.contentType("plugin::internal.data").lifecycles = {
        afterUpdate: async (event) => {
            strapi
                .service("plugin::internal.data")
                .setBePaidTestMode(event.result.bePaidTestMode);
            if (strapi.plugins["redis"]?.connections?.default?.client) {
                await strapi.plugins[
                    "redis"
                ].connections?.default?.client.expire("currencyCoefficient", 0);
            }
        },
    };
};
