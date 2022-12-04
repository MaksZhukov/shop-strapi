import {
    hasDelayOfSendingNewProductsEmail,
    sendNewProductsToEmail,
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
        if (await hasDelayOfSendingNewProductsEmail(strapi)) {
            sendNewProductsToEmail({ strapi });
        }
        strapi.db.query("api::kind-spare-part.kind-spare-part").updateMany({
            data: {
                type: "regular",
            },
        });
    },
};
