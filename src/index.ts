import slugify from "slugify";
import runScripts from "./scripts";
import {
    generateProductFullDescription,
    getProductH1,
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
        if (process.env.NODE_ENV === "production") {
            sendNotificationOnStart();
            if (process.env.NODE_APP_INSTANCE === "0") {
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 8);

                // Query cabins created or updated in the last week
                const cabins = await strapi.db
                    .query("api::cabin.cabin")
                    .findMany({
                        populate: ["brand", "model", "generation", "images"],
                        where: {
                            $or: [
                                {
                                    createdAt: { $gte: oneWeekAgo },
                                },
                            ],
                        },
                        orderBy: { createdAt: "desc" },
                    });
                cabins.forEach(async (cabin) => {
                    const h1 =
                        cabin.name +
                        " " +
                        (cabin.brand?.name ?? "") +
                        " " +
                        (cabin.model?.name ?? "");
                    const slug =
                        slugify(cabin.name, { lower: true, strict: true }) +
                        "-" +
                        cabin.id;
                    const updatedCabin = await strapi.db
                        .query("api::cabin.cabin")
                        .update({
                            where: { id: cabin.id },
                            data: {
                                h1: h1,
                                slug: slug,
                            },
                        });
                });

                // Query cabins created or updated in the last week
                const spareParts = await strapi.db
                    .query("api::spare-part.spare-part")
                    .findMany({
                        populate: ["brand", "model", "generation", "images"],
                        where: {
                            $or: [
                                {
                                    createdAt: { $gte: oneWeekAgo },
                                },
                            ],
                        },
                        orderBy: { createdAt: "desc" },
                    });
                spareParts.forEach(async (sparePart) => {
                    const h1 =
                        sparePart.name +
                        " " +
                        (sparePart.brand?.name ?? "") +
                        " " +
                        (sparePart.model?.name ?? "");
                    const slug =
                        slugify(sparePart.name, { lower: true, strict: true }) +
                        "-" +
                        sparePart.id;

                    await strapi.db.query("api::spare-part.spare-part").update({
                        where: { id: sparePart.id },
                        data: {
                            h1: h1,
                            slug: slug,
                        },
                    });
                });
                scheduleGenerateSitemap();
                // if (await hasDelayOfSendingNewProductsEmail(strapi)) {
                //     sendNewProductsToEmail({ strapi });
                // }
                // if (await hasDelayOfSendingProductsInCsvEmail(strapi)) {
                //     sendProductsInCSVToEmail({ strapi });
                // }
                // if (await hasDelayOfSendingYMLEmail(strapi)) {
                //     sendYMLsToEmail({ strapi });
                // }
                // if (await hasDelayOfProductDescriptionGenerated(strapi)) {
                //     generateProductFullDescription({ strapi });
                // }
            }

            runScripts(strapi);
        } else if (process.env.NODE_ENV === "development") {
            runScripts(strapi);
        }
    },
};
