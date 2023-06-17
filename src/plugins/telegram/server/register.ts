import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => {
    if (
        process.env.NODE_ENV === "production" &&
        process.env.NODE_APP_INSTANCE === "0"
    ) {
        strapi.contentType("plugin::telegram.jobs").lifecycles = {
            afterCreate: () => {
                strapi
                    .service("plugin::telegram.service")
                    ?.runTelegramMessages();
            },
            afterDelete: () => {
                strapi
                    .service("plugin::telegram.service")
                    ?.runTelegramMessages();
            },
        };
    }
};
