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
            process.env.NODE_ENV !== "development" &&
            (await hasDelayOfSendingNewProductsEmail(strapi))
        ) {
            sendNewProductsToEmail({ strapi });
        }
        if (
            process.env.NODE_ENV !== "development" &&
            (await hasDelayOfSendingProductsInCsvEmail(strapi))
        ) {
            sendProductsInCSVToEmail({ strapi });
        }
    },
};
