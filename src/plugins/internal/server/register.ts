import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
    strapi.contentType("plugin::internal.data").lifecycles = {
        afterUpdate: async (event) => {
            strapi
                .service("plugin::internal.data")
                .setBePaidTestMode(event.result.bePaidTestMode);
        },
    };
};
