import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
    strapi.contentType("plugin::internal.data").lifecycles = {
        afterUpdate: async (event) => {
            strapi
                .service("plugin::internal.data")
                .setBePaidTestMode(event.result.bePaidTestMode);
            //@ts-expect-error error
            const { currencyCoefficient } = await strapi
                .service("plugin::internal.data")
                .find({
                    populate: { currencyCoefficient: true },
                });
            strapi
                .service("plugin::internal.data")
                .setCurrencyCoefficient(currencyCoefficient);
        },
    };
};
