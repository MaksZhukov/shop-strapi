import axios from "axios";
import { convertArrayToCSV } from "convert-array-to-csv";
import { Agent } from "https";

const DAY_MS = 24 * 60 * 60 * 1000;

const getProductUrls = async (uid, date, clientUrl, productTypeSlug, title) => {
    let urls = (
        await strapi.db.query(uid).findMany({
            select: ["slug"],
            // where: {
            //     createdAt: { $gte: date.setDate(date.getDate() - 130) },
            // },
            //@ts-expect-error error
            populate: { brand: true },
        })
    ).map(
        (item) =>
            clientUrl + `/${productTypeSlug}/${item.brand?.name}/` + item.slug
    );
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
        let clientUrl = strapi.config.get("server.clientUrl");
        const date = new Date();
        const results = await Promise.all([
            getProductUrls(
                "api::spare-part.spare-part",
                date,
                clientUrl,
                "spare-parts",
                "Запчасти"
            ),
            getProductUrls("api::tire.tire", date, clientUrl, "tires", "Шины"),
            getProductUrls(
                "api::wheel.wheel",
                date,
                clientUrl,
                "wheels",
                "Диски"
            ),
            getProductUrls(
                "api::cabin.cabin",
                date,
                clientUrl,
                "cabins",
                "Салоны"
            ),
        ]);
        let str = results.reduce((prev, curr) => prev + curr, "");
        await strapi.plugins.email.services.email.send({
            to: [
                strapi.config.get("server.emailForNewProducts"),
                "maks_zhukov_97@mail.ru",
            ],
            from: strapi.plugins.email.config("providerOptions.username"),
            subject: "Ссылки на все товары",
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
    let key = strapi.config.get("server.currency-freaks-key");
    try {
        const {
            data: {
                rates: { BYN },
            },
        } = await axios.get(
            `https://api.currencyfreaks.com/latest?apikey=${key}&symbols=BYN`,
            { httpsAgent: new Agent({ rejectUnauthorized: false }) }
        );
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

const getCategory = (item) => ({
    cabin: `салон ${item.brand?.name} ${item.model?.name}`,
    tire: `шины ${item.brand?.name}`,
    wheel: `диски ${item.brand?.name}`,
    sparePart: `запчасть ${item.brand?.name} ${item.model?.name}`,
});

export const hasDelayOfSendingProductsInCsvEmail = async (strapi) => {
    const { dateProductsInCsvSentToEmail } = await strapi
        .service("plugin::internal.data")
        .find();
    return (
        new Date(dateProductsInCsvSentToEmail).getTime() <
        new Date().getTime() - DAY_MS
    );
};

const getDataForCsv = (items, serverUrl) =>
    items.map((item) => [
        getCategory(item)[item.type],
        item.name,
        item.id,
        item.description,
        item.price,
        item.images ? serverUrl + item.images[0].url : "",
    ]);

export const sendProductsInCSVToEmail = async ({ strapi }) => {
    const serverUrl = strapi.config.get("server.serverUrl");
    const header = [
        "Категория",
        "Название",
        "Идентификатор",
        "Описание",
        "Цена",
        "Фото",
    ];
    const [spareParts, cabins, wheels, tires] = await Promise.all([
        strapi.db
            .query("api::spare-part.spare-part")
            .findMany({ populate: { images: true, brand: true, model: true } }),
        strapi.db
            .query("api::cabin.cabin")
            .findMany({ populate: { images: true, brand: true, model: true } }),
        strapi.db
            .query("api::wheel.wheel")
            .findMany({ populate: { images: true, brand: true } }),
        strapi.db
            .query("api::tire.tire")
            .findMany({ populate: { images: true, brand: true } }),
    ]);

    let data = [
        ...getDataForCsv(spareParts, serverUrl),
        ...getDataForCsv(cabins, serverUrl),
        ...getDataForCsv(wheels, serverUrl),
        ...getDataForCsv(tires, serverUrl),
    ];

    const csv: string = convertArrayToCSV(data, { header });

    await strapi.plugins.email.services.email.send({
        to: [
            strapi.config.get("server.emailForNewProducts"),
            "maks_zhukov_97@mail.ru",
        ],
        from: strapi.plugins.email.config("providerOptions.username"),
        subject: "Все Товары",
        attachments: [
            {
                filename: "products.csv",
                content: "\ufeff" + csv,
            },
        ],
    });

    await strapi.service("plugin::internal.data").createOrUpdate({
        data: {
            dateProductsInCsvSentToEmail: new Date().getTime(),
        },
    });
};

export const getCountUnrelatedMedia = async () => {
    let count = 0;
    const medias = await strapi.plugins["upload"].services.upload.findMany({
        populate: "*",
    });
    medias.forEach((media) => {
        if (!media.related.length) {
            count++;
        }
    });
    return count;
};

export const generateDefaultBrandTextComponent = (item, type, slug) => {
    let clientUrl = strapi.config.get("server.clientUrl");
    return {
        content: `<p>
    Еще больше качественных товаров в категории сайта <a href="${clientUrl}/${slug}/${
            item.slug
        }"><span style="font-family:&quot;Calibri&quot;,sans-serif;">${type} для ${item.name.toLowerCase()}</span></a>
</p>`,
    };
};
