import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
    strapi.contentType("plugin::internal.data").lifecycles = {
        afterUpdate: async (event) => {
            strapi
                .service("plugin::internal.data")
                .setBePaidTestMode(event.result.bePaidTestMode);
            console.log("AFTER_UPDATE", event.result);
            strapi
                .service("plugin::internal.data")
                .setCurrencyCoefficient(event.result.currencyCoefficient);
        },
    };
};
