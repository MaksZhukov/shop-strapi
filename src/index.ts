import slugify from "slugify";
import runScripts from "./scripts";
import {
    hasDelayOfSendingNewProductsEmail,
    hasDelayOfSendingProductsInCsvEmail,
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
        // fileMetadataService({ strapi });
        if (
            process.env.NODE_ENV === "production" &&
            process.env.NODE_APP_INSTANCE === "0"
        ) {
            const brands = await strapi.db.query("api::brand.brand").findMany();
            const tireBrands = await strapi.db
                .query("api::tire-brand.tire-brand")
                .findMany();
            let clientUrl = strapi.config.get("server.clientUrl");

            brands.forEach(async (item) => {
                await strapi.entityService.update("api::brand.brand", item.id, {
                    data: {
                        ...item,
                        productBrandProductTexts: {
                            sparePartBrandText: {
                                content: `<p>
                    Еще больше качественных товаров в категории сайта <a href="${clientUrl}/spare-parts/${
                                    item.slug
                                }"><span style="font-family:&quot;Calibri&quot;,sans-serif;">Запчасти для ${item.name.toLowerCase()}</span></a>
                </p>`,
                            },
                            cabinTextBrand: {
                                content: `<p>
                    Еще больше качественных товаров в категории сайта <a href="${clientUrl}/cabins/${
                                    item.slug
                                }"><span style="font-family:&quot;Calibri&quot;,sans-serif;">Салоны для ${item.name.toLowerCase()}</span></a>
                </p>`,
                            },
                            wheelTextBrand: {
                                content: `<p>
                    Еще больше качественных товаров в категории сайта <a href="${clientUrl}/wheels/${
                                    item.slug
                                }"><span style="font-family:&quot;Calibri&quot;,sans-serif;">Диски для ${item.name.toLowerCase()}</span></a>
                </p>`,
                            },
                        },
                    },
                });
            });

            tireBrands.forEach(async (item) => {
                await strapi.entityService.update(
                    "api::tire-brand.tire-brand",
                    item.id,
                    {
                        data: {
                            ...item,
                            productBrandText: {
                                content: `<p>
                        Еще больше качественных товаров в категории сайта <a href="${clientUrl}/tires/${
                                    item.slug
                                }"><span style="font-family:&quot;Calibri&quot;,sans-serif;">Диски для ${item.name.toLowerCase()}</span></a>
                    </p>`,
                            },
                        },
                    }
                );
            });
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
