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
            process.env.NODE_ENV !== "development" &&
            process.env.NODE_APP_INSTANCE === "0" &&
            (await hasDelayOfSendingNewProductsEmail(strapi))
        ) {
            sendNewProductsToEmail({ strapi });
        }
        if (
            process.env.NODE_ENV !== "development" &&
            process.env.NODE_APP_INSTANCE === "0" &&
            (await hasDelayOfSendingProductsInCsvEmail(strapi))
        ) {
            sendProductsInCSVToEmail({ strapi });
        }
        const brands = await strapi.db.query("api::brand.brand").findMany();

        brands.forEach((item) => {
            strapi.db.query("api::brand.brand").update({
                where: { id: item.id },
                data: { ...item, slug: slugify(item.name) },
            });
        });

        const tireBrands = await strapi.db
            .query("api::tire-brand.tire-brand")
            .findMany();

        tireBrands.forEach((item) => {
            strapi.db.query("api::tire-brand.tire-brand").update({
                where: { id: item.id },
                data: { ...item, slug: slugify(item.name) },
            });
        });
        runScripts(strapi);
    },
};
