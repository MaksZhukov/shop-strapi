import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
    //@ts-expect-error error
    strapi.contentType("plugin::internal.data").lifecycles = {
        afterUpdate: async (event) => {
            //@ts-expect-error error
            if (strapi.redis?.connections?.default?.client) {
                //@ts-expect-error error
                await strapi.redis.connections?.default?.client.expire(
                    "currencyCoefficient",
                    0
                );
            }
        },
    };
};
