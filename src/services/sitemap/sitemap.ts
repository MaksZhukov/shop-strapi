import { SitemapStream } from "sitemap";
import fs from "fs";
import { STATIC_LINKS } from "./constants";

const getItems = (uid, params = {}) => strapi.db.query(uid).findMany(params);

const productTypeUrlSlug = {
    tire: "tires",
    cabin: "cabins",
    sparePart: "spare-parts",
    wheel: "wheels",
};

const generateLink = (url) => ({
    url,
    changefreq: "daily",
    priority: 1,
});

const generateProductLink = (data) =>
    generateLink(
        `/${productTypeUrlSlug[data.type]}/${data.brand?.slug}/${data.slug}`
    );

const generateProductLinks = (items) =>
    items.map((item) => generateProductLink(item));

const generateSitemap = async () => {
    const [
        spareParts,
        wheels,
        tires,
        cabins,
        vacancies,
        articles,
        cars,
        carsOnParts,
        brands,
        tireBrands,
    ] = await Promise.all([
        getItems("api::spare-part.spare-part", { populate: ["brand"] }),
        getItems("api::wheel.wheel", { populate: ["brand"] }),
        getItems("api::tire.tire", { populate: ["brand"] }),
        getItems("api::cabin.cabin", { populate: ["brand"] }),
        getItems("api::vacancy.vacancy"),
        getItems("api::article.article"),
        getItems("api::car.car"),
        getItems("api::car-on-parts.car-on-parts"),
        getItems("api::brand.brand"),
        getItems("api::tire-brand.tire-brand"),
    ]);
    let links = [
        ...generateProductLinks(spareParts),
        ...generateProductLinks(wheels),
        ...generateProductLinks(tires),
        ...generateProductLinks(cabins),
        ...vacancies.map((item) => generateLink(`/vacansies/${item.slug}`)),
        ...articles.map((item) => generateLink(`/articles/${item.slug}`)),
        ...cars.map((item) => generateLink(`/awaiting-cars/${item.slug}`)),
        ...carsOnParts.map((item) =>
            generateLink(`/cars-on-parts/${item.slug}`)
        ),
        ...brands
            .map((item) => [
                generateLink(`/spare-parts/${item.slug}`),
                generateLink(`/wheels/${item.slug}`),
                generateLink(`/cabins/${item.slug}`),
            ])
            .flat(),
        ...tireBrands.map((item) => generateLink(`/tires/${item.slug}`)),
    ];

    let clientUrl = strapi.config.get("server.clientUrl");
    const frontendNearFolderPath = strapi.config.get(
        "server.frontendNearFolderPath"
    );
    const sitemap = new SitemapStream({ hostname: clientUrl });
    const writeStream = fs.createWriteStream(
        frontendNearFolderPath + "/sitemap.xml"
    );
    sitemap.pipe(writeStream);
    [...STATIC_LINKS, ...links].forEach((item) => {
        sitemap.write(item);
    });
    sitemap.end();
    strapi.log.info("SITEMAP GENERATED");
};

let timeoutId = null;

const FIVE_MINUTES = 300000;

const scheduleGenerateSitemap = () => {
    if (timeoutId) {
        return;
    }
    timeoutId = setTimeout(async () => {
        timeoutId = null;
        await generateSitemap();
    }, FIVE_MINUTES);
};

export default scheduleGenerateSitemap;
