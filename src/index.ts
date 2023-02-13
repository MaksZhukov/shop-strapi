import runScripts from "./scripts";
import {
    hasDelayOfSendingNewProductsEmail,
    hasDelayOfSendingProductsInCsvEmail,
    removeImagesByApiUID,
    sendNewProductsToEmail,
    sendProductsInCSVToEmail,
} from "./services";
import scheduleGenerateSitemap from "./services/sitemap";

export default {
    /**
     * An asynchronous register function that runs before
     * your application is initialized.
     *
     * This gives you an opportunity to extend code.
     */
    register(/*{ strapi }*/) {},

    /**
     * An asynchronous bootstrap function that runs before
     * your application gets started.
     *
     * This gives you an opportunity to set up your data model,
     * run jobs, or perform some special logic.
     */
    async bootstrap({ strapi }) {
        const test = await strapi
            .service("api::spare-part.spare-part")
            .findOne(234, {
                populate: ["images"],
            });
        console.log(test);
        // fileMetadataService({ strapi });
        if (
            process.env.NODE_ENV === "production" &&
            process.env.NODE_APP_INSTANCE === "0"
        ) {
            if (await hasDelayOfSendingNewProductsEmail(strapi)) {
                sendNewProductsToEmail({ strapi });
            }
            if (await hasDelayOfSendingProductsInCsvEmail(strapi)) {
                sendProductsInCSVToEmail({ strapi });
            }

            runScripts(strapi);
        } else if (process.env.NODE_ENV === "development") {
            runScripts(strapi);
        }
        scheduleGenerateSitemap();
    },
};
