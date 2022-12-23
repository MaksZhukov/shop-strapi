import slugify from "slugify";
import runScripts from "./scripts";
import {
    hasDelayOfSendingNewProductsEmail,
    hasDelayOfSendingProductsInCsvEmail,
    sendNewProductsToEmail,
    sendProductsInCSVToEmail,
    updateCurrency,
} from "./services";

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
        // fileMetadataService({ strapi });
        if (
            process.env.NODE_ENV === "production" &&
            process.env.NODE_APP_INSTANCE === "0" &&
            (await hasDelayOfSendingNewProductsEmail(strapi))
        ) {
            sendNewProductsToEmail({ strapi });
        }
        if (
            process.env.NODE_ENV === "production" &&
            process.env.NODE_APP_INSTANCE === "0" &&
            (await hasDelayOfSendingProductsInCsvEmail(strapi))
        ) {
            sendProductsInCSVToEmail({ strapi });
        }
        if (process.env.NODE_APP_INSTANCE === "0") {
            const cabins = await strapi.db
                .query("api::cabin.cabin")
                .findMany({ populate: { images: true } });
            cabins.forEach((item) => {
                if (item.images) {
                    item.images.forEach(async (image) => {
                        strapi.plugins["upload"].services.upload.remove(image);
                    });
                }
            });
        }
        if (
            (process.env.NODE_ENV === "production" &&
                process.env.NODE_APP_INSTANCE === "0") ||
            process.env.NODE_ENV === "development"
        ) {
            runScripts(strapi);
        }
    },
};
