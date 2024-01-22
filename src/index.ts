import runScripts from "./scripts";
import {
    generateProductFullDescription,
    hasDelayOfProductDescriptionGenerated,
    hasDelayOfSendingNewProductsEmail,
    hasDelayOfSendingProductsInCsvEmail,
    hasDelayOfUpdatingImagesMetadata,
    sendNewProductsToEmail,
    sendNotificationOnStart,
    sendProductsInCSVToEmail,
    updateCurrency,
    updateImagesMetadata,
} from "./services";
import scheduleGenerateSitemap from "./services/sitemap";
import { hasDelayOfSendingYMLEmail, sendYMLsToEmail } from "./services/yml/yml";

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
        if (
            process.env.NODE_ENV === "production" &&
            process.env.NODE_APP_INSTANCE === "0"
        ) {
            // if (await hasDelayOfSendingNewProductsEmail(strapi)) {
            //     sendNewProductsToEmail({ strapi });
            // }
            // if (await hasDelayOfSendingProductsInCsvEmail(strapi)) {
            //     sendProductsInCSVToEmail({ strapi });
            // }
            // if (await hasDelayOfSendingYMLEmail(strapi)) {
            //     sendYMLsToEmail({ strapi });
            // }
            if (await hasDelayOfProductDescriptionGenerated(strapi)) {
                generateProductFullDescription({ strapi });
            }
            sendNotificationOnStart();
            scheduleGenerateSitemap();

            runScripts(strapi);
        } else if (process.env.NODE_ENV === "development") {
            runScripts(strapi);
        }
        updateImagesMetadata({ strapi });
    },
};
