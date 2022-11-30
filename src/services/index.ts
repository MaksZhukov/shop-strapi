import axios from "axios";
import { Agent } from "https";

const DAY_MS = 24 * 60 * 60 * 1000;

const getProductUrls = async (uid, date, clientUrl, productType, title) => {
    let urls = (
        await strapi.db.query(uid).findMany({
            select: ["slug"],
            where: {
                createdAt: { $gte: date.setDate(date.getDate() - 1) },
            },
        })
    ).map((item) => clientUrl + `/products/${productType}/` + item.slug);
    return urls.reduce((prev, curr) => prev + curr + "\n", `${title}\n`);
};

export const hasDelayOfSendingNewProductsEmail = async (strapi) => {
    const { dateNewProductSentToEmail } = await strapi
        .service("plugin::internal.data")
        .find();
    return (
        new Date(dateNewProductSentToEmail).getTime() <
        new Date().getTime() - DAY_MS
    );
};

export const sendNewProductsToEmail = async ({ strapi }) => {
    try {
        let clientUrl = strapi.config.get("api.clientUrl");
        const date = new Date();
        const results = await Promise.all([
            getProductUrls(
                "api::spare-part.spare-part",
                date,
                clientUrl,
                "sparePart",
                "Запчасти"
            ),
            getProductUrls("api::tire.tire", date, clientUrl, "tire", "Шины"),
            getProductUrls(
                "api::wheel.wheel",
                date,
                clientUrl,
                "wheel",
                "Диски"
            ),
        ]);
        let str = results.reduce((prev, curr) => prev + curr, "");
        await strapi.plugins.email.services.email.send({
            to: strapi.config.get("api.emailForNewProducts"),
            from: strapi.plugins.email.config("providerOptions.username"),
            subject: "Ссылки на новые товары",
            attachments: [
                {
                    filename: "products.txt",
                    content: str,
                },
            ],
        });
        await strapi.service("plugin::internal.data").createOrUpdate({
            data: {
                dateNewProductSentToEmail: new Date().getTime(),
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateCurrency = async ({ strapi }) => {
    let key = strapi.config.get("api.currency-freaks-key");
    try {
        const {
            data: {
                rates: { BYN },
            },
        } = await axios.get(
            `https://api.currencyfreaks.com/latest?apikey=${key}&symbols=BYN`,
            { httpsAgent: new Agent({ rejectUnauthorized: false }) }
        );
        console.log(BYN);
        await strapi.service("plugin::internal.data").createOrUpdate({
            data: {
                currencyDate: new Date().getTime(),
                currencyCoefficient: 1 / BYN,
            },
        });
    } catch (err) {
        console.log(err);
    }
};
