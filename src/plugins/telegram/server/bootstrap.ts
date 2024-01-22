import { Strapi } from "@strapi/strapi";

export default async ({ strapi }: { strapi: Strapi }) => {
    if (
        process.env.NODE_ENV === "production" &&
        process.env.NODE_APP_INSTANCE === "0"
    ) {
        // strapi.service("plugin::telegram.service")?.runTelegramMessages();
    }
};
