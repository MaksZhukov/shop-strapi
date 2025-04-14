import axios from "axios";
import fs from "fs";
import { convertArrayToCSV } from "convert-array-to-csv";
import { Agent } from "https";
import { productTypeUrlSlug } from "../config";
import { ALTS_ARR } from "./constants";
import { CurrencyRate } from "./types";
import { updateImageMetadata } from "./imageMetadata";

const DAY_MS = 24 * 60 * 60 * 1000;

export const hasDelayOfSendingNewProductsEmail = async (strapi) => {
    const { dateNewProductSentToEmail } = await strapi
        .service("plugin::internal.data")
        .find();
    return (
        new Date(dateNewProductSentToEmail).getTime() <
        new Date().getTime() - DAY_MS
    );
};

export const getProductUrl = (item) => {
    let clientUrl = strapi.config.get("server.clientUrl");
    return (
        clientUrl +
        `/${productTypeUrlSlug[item.type]}/${item.brand?.slug}/` +
        item.slug
    );
};

export const getProductsUrls = async () => {
    let queries = [
        { queryUID: "api::spare-part.spare-part", populate: ["brand"] },
        { queryUID: "api::cabin.cabin", populate: ["brand"] },
        { queryUID: "api::wheel.wheel", populate: ["brand"] },
        { queryUID: "api::tire.tire", populate: ["brand"] },
    ];
    const urls = [];

    await runProductsQueriesWithLimit(queries, 10000, (products: any[]) => {
        urls.push(...products.map((item) => getProductUrl(item)));
    });
    return urls;
};

export const sendNewProductsToEmail = async ({ strapi }) => {
    try {
        const urls = await getProductsUrls();

        let str = urls.reduce((prev, curr) => prev + curr + "\n", "");
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
    try {
        const { data } = await axios.get<CurrencyRate[]>(
            `https://www.nbrb.by/api/exrates/rates?periodicity=0`,
            {
                httpsAgent: new Agent({ rejectUnauthorized: false }),
            }
        );
        const usdExchangeRate = data.find(
            (currency) => currency.Cur_Abbreviation === "USD"
        );
        const rubExchangeRate = data.find(
            (currency) => currency.Cur_Abbreviation === "RUB"
        );

        await strapi.service("plugin::internal.data").createOrUpdate({
            data: {
                currencyDate: new Date().getTime(),
                currencyCoefficient: {
                    usd:
                        (1 / usdExchangeRate.Cur_OfficialRate) *
                        usdExchangeRate.Cur_Scale,
                    rub:
                        (1 / rubExchangeRate.Cur_OfficialRate) *
                        rubExchangeRate.Cur_Scale,
                },
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

export const hasDelayOfProductDescriptionGenerated = async (strapi) => {
    const { dateProductFullDescriptionGenerated } = await strapi
        .service("plugin::internal.data")
        .find();
    return (
        new Date(dateProductFullDescriptionGenerated).getTime() <
        new Date().getTime() - DAY_MS
    );
};

export const hasDelayOfUpdatingImagesMetadata = async (strapi) => {
    const { dateUpdatingImagesMetadata } = await strapi
        .service("plugin::internal.data")
        .find();
    return (
        new Date(dateUpdatingImagesMetadata).getTime() <
        new Date().getTime() - DAY_MS
    );
};

const getDataForCsv = (items, serverUrl) =>
    items.map((item) => [
        getCategory(item)[item.type],
        item.h1,
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

    const queries = [
        {
            queryUID: "api::spare-part.spare-part",
            populate: ["images", "brand", "model"],
        },
        {
            queryUID: "api::cabin.cabin",
            populate: ["images", "brand", "model"],
        },
        {
            queryUID: "api::wheel.wheel",
            populate: ["images", "brand"],
        },
        {
            queryUID: "api::tire.tire",
            populate: ["images", "brand"],
        },
    ];

    const data = [];

    await runProductsQueriesWithLimit(queries, 5000, async (products) => {
        data.push(...getDataForCsv(products, serverUrl));
    });

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

export const deleteUnrelatedMediaForApiUploadFolder = async () => {
    const medias = await strapi.plugins["upload"].services.upload.findMany({
        populate: "*",
    });

    medias
        .filter((item) => !item.related.length && item.folder?.id === 1)
        .forEach((item) => {
            strapi.plugins["upload"].services.upload.remove(item);
        });
};

export const removeImagesByApiUID = async (apiUID) => {
    const spareParts = await strapi.db.query(apiUID).findMany({
        populate: ["images"],
    });
    const images = spareParts.map((item) => item.images).flat();
    images.forEach((item) => {
        strapi.plugins["upload"].services.upload.remove(item);
    });
};

export const generateDefaultBrandTextComponent = (item, type, slug) => {
    let clientUrl = strapi.config.get("server.clientUrl");
    return {
        content: `<p>
        Если у вас не получилось найти именно то, что бы вы хотели, позвоните нам и мы поможем вам выбрать, <a href="${clientUrl}/${slug}/${item.slug}">купить <span> ${type} для ${item.name}</span></a>, те именно то, что необходимо вам 
</p>`,
    };
};

export const generateDefaultBrandSnippets = (type: string, name: string) => ({
    title: `Купить ${type} для ${name}. Доставка. Цены не кусаются`,
    description: `Предлагаем купить ${type} для ${name} в нашем магазине. Диски, салоны, запчасти. На нашей разборке найдется все для вашего авто`,
    keywords: `${type.charAt(0).toUpperCase() + type.slice(1)} для ${name}`,
    h1: `${type.charAt(0).toUpperCase() + type.slice(1)} для ${name}`,
});

export const generateDefaultTireBrandSnippets = (name: string) => ({
    title: `Купить шины ${name}. Доставка. Цены не кусаются`,
    description: `Предлагаем купить шины ${name} в нашем магазине. На нашей разборке найдется все для вашего авто`,
    keywords: "Шины " + name,
    h1: "Шины " + name,
});

export const generateDefaultModelSnippets = (
    type: string,
    brandName: string,
    modelName: string
) => ({
    title: `${
        type.charAt(0).toUpperCase() + type.slice(1)
    } для ${brandName} ${modelName} б/у купить с доставкой по Беларуси`,
    description: `Ищете как можно ${type} для ${brandName} ${modelName} б/у купить выгодно? У нас топ цены, доставка, покупка онлайн на сайте. Огромный выбор`,
    keywords: `${
        type.charAt(0).toUpperCase() + type.slice(1)
    } для ${brandName} ${modelName}`,
    h1: `${
        type.charAt(0).toUpperCase() + type.slice(1)
    } для ${brandName} ${modelName}`,
});

export const updateAltTextForProductImages = (data, images) => {
    images?.forEach((image, index) => {
        let values = {
            h1: data.h1,
            title: data.seo?.title,
            description: data.seo?.description,
        };
        let alt = values[ALTS_ARR[index]] || data.h1 + " " + ALTS_ARR[index];
        try {
            strapi.plugins.upload.services.upload.updateFileInfo(image.id, {
                alternativeText: alt,
                caption: alt,
            });
        } catch (err) {
            strapi.plugins.email.services.email.send({
                to: "maks_zhukov_97@mail.ru",
                from: strapi.plugins.email.config("providerOptions.username"),
                subject: `ERROR updateAltTextForProductImages for ${image.id}`,
                text: err.toString(),
            });
            console.log(
                `ERROR updateFileInfo for PRODUCT: ${JSON.stringify(
                    data
                )}, IMAGES: ${JSON.stringify(images)}`
            );
        }
    });
};

export const getStringByTemplateStr = (value: string, data: any) => {
    if (!value) {
        return "";
    }
    let newValue = value;
    for (let result of value.matchAll(/{(\w+)}/g)) {
        let field = result[1];
        newValue = newValue.replace(
            result[0],
            typeof data[field] === "string" ? data[field] : data[field]?.name
        );
    }
    return newValue;
};

export const getProductPageSeo = (pageSeo: any, product: any) => {
    return {
        title:
            product.seo?.title ||
            getStringByTemplateStr(pageSeo.title, product),
        description:
            product.seo?.description ||
            getStringByTemplateStr(pageSeo.description, product),
        keywords:
            product.seo?.keywords ||
            getStringByTemplateStr(pageSeo.keywords, product),
    };
};

export const scheduleUpdateAltTextForProductImages = (
    data,
    apiUID,
    pageProductApiUID
) => {
    setTimeout(async () => {
        const [entity, pageProduct] = await Promise.all([
            strapi.service(apiUID).findOne(data.id, {
                populate: { images: true, seo: true },
            }),
            strapi.service(pageProductApiUID).find({ populate: { seo: true } }),
        ]);
        //@ts-expect-error error
        entity.seo = getProductPageSeo(pageProduct.seo, entity);
        updateAltTextForProductImages(entity, entity.images);
    }, 300);
};

export const getProductH1 = async (data, isTire: boolean) => {
    let h1 = data.name;
    if (data.brand) {
        const brand = await strapi.entityService.findOne(
            isTire ? "api::tire-brand.tire-brand" : "api::brand.brand",
            data.brand
        );
        h1 += " " + (brand?.name || "");
        if (data.model) {
            const model = await strapi.entityService.findOne(
                "api::model.model",
                data.model
            );
            h1 += " " + model?.name || "";
            data.h1 = h1;
        }
    }
    return h1;
};

export const sendNotificationOnStart = async () =>
    strapi.plugins.email.services.email.send({
        to: "maks_zhukov_97@mail.ru",
        from: strapi.plugins.email.config("providerOptions.username"),
        subject: "Start Strapi BE Successful",
    });

export const removeFavoritesOnSold = async (data, component) => {
    if (data.result.sold) {
        const favorites = await strapi.db
            .query("api::favorite.favorite")
            .findMany({
                where: {
                    uid: { $endsWith: `-${data.result.id}-${component}` },
                },
            });
        await strapi.db.query("api::favorite.favorite").deleteMany({
            where: {
                id: favorites.map((item) => item.id),
            },
        });
    }
};

export const runProductsQueriesWithLimit = async (
    queries: {
        queryUID: string;
        populate: string[];
        select?: string[];
        where?: any;
    }[],
    limit,
    callback,
    timeout = 100
) => {
    let index = 0;
    let page = 0;
    let products = [];
    while (index < queries.length) {
        let { queryUID, select, populate, where } = queries[index];
        const results = await strapi.db.query(queryUID).findMany({
            populate,
            select,
            where,
            limit: limit - products.length,
            offset: page * limit,
        });
        products.push(...results);
        if (products.length === limit || index === queries.length - 1) {
            await new Promise((res) => {
                setTimeout(() => {
                    res(callback(products));
                }, timeout);
            });
            page++;
            products = [];
        }
        if (results.length < limit) {
            index++;
            page = 0;
        }
    }
};

export const addProductUrlToTelegramAllProductsJobUrls = async (
    id: string,
    uid: string
) => {
    const product = await strapi.db
        .query(uid)
        .findOne({ where: { id }, populate: ["brand"] });
    const productUrl = getProductUrl(product);
    const job = await strapi.db
        .query("plugin::telegram.jobs")
        .findOne({ where: { allProducts: true } });
    if (job) {
        await strapi.db
            .query("plugin::telegram.urls")
            .create({ data: { url: productUrl, job: job.id } });
    }
};

export const generateProductFullDescription = async ({ strapi }) => {
    let queries = [
        {
            queryUID: "api::spare-part.spare-part",
            populate: ["brand"],
        },
        { queryUID: "api::cabin.cabin", populate: [] },
        { queryUID: "api::wheel.wheel", populate: [] },
        { queryUID: "api::tire.tire", populate: [] },
    ];

    const [
        pageProductSparePart,
        pageProductCabin,
        pageProductTire,
        pageProductWheel,
    ] = await Promise.all([
        strapi
            .service("api::page-product-spare-part.page-product-spare-part")
            .find(),
        strapi.service("api::page-product-cabin.page-product-cabin").find(),
        strapi.service("api::page-product-tire.page-product-tire").find(),
        strapi.service("api::page-product-wheel.page-product-wheel").find(),
    ]);
    const additionalDescriptionByType = {
        sparePart: pageProductSparePart.additionalDescription,
        cabin: pageProductCabin.additionalDescription,
        tire: pageProductTire.additionalDescription,
        wheel: pageProductWheel.additionalDescription,
    };
    console.time("start");
    const writeableStream = fs.createWriteStream(
        "private/productDescriptions.json"
    );
    writeableStream.write("[");
    await runProductsQueriesWithLimit(queries, 10000, (products: any[]) => {
        const data = products.map((item) => ({
            id: item.id,
            type: item.type,
            name: item.name,
            description: item.description,
            additionalDescription: getStringByTemplateStr(
                additionalDescriptionByType[item.type],
                item
            ).replace(/<\/?[^>]+(>|$)/g, ""),
        }));
        writeableStream.write(
            JSON.stringify(data, null, 2).replace("[", "").replace("]", "")
        );
    });
    writeableStream.write("]");
    writeableStream.end();
    console.timeEnd("start");

    await strapi.service("plugin::internal.data").createOrUpdate({
        data: {
            dateProductFullDescriptionGenerated: new Date().getTime(),
        },
    });

    strapi.plugins.email.services.email.send({
        to: "maks_zhukov_97@mail.ru",
        from: strapi.plugins.email.config("providerOptions.username"),
        subject: "Strapi generateProductFullDescription successful",
    });
};

export const updateImagesMetadata = async ({ strapi }) => {
    let clientUrl = strapi.config.get("server.clientUrl");
    const { dateUpdatingImagesMetadata } = await strapi
        .service("plugin::internal.data")
        .find({});

    const where = {
        createdAt: { $gte: dateUpdatingImagesMetadata },
        updatedAt: { $gte: dateUpdatingImagesMetadata },
    };
    const queries = [
        {
            queryUID: "api::spare-part.spare-part",
            populate: ["brand", "images"],
            where,
        },
        {
            queryUID: "api::cabin.cabin",
            populate: ["brand", "images"],
            where,
        },
        {
            queryUID: "api::wheel.wheel",
            populate: ["brand", "images"],
            where,
        },
        {
            queryUID: "api::tire.tire",
            populate: ["brand", "images"],
            where,
        },
    ];

    await runProductsQueriesWithLimit(
        queries,
        100,
        (products: any[]) => {
            products.forEach((entity) => {
                entity.images?.forEach((item) => {
                    updateImageMetadata(
                        item.url,
                        `${clientUrl}/${productTypeUrlSlug[entity.type]}/${
                            entity.brand?.slug
                        }/${entity.slug}`
                    );
                });
            });
        },
        5000
    );

    await strapi.service("plugin::internal.data").createOrUpdate({
        data: {
            dateUpdatingImagesMetadata: new Date().getTime(),
        },
    });
};
