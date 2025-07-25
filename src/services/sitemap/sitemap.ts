import { SitemapStream } from "sitemap";
import fs from "fs";
import { STATIC_LINKS } from "./constants";
import { productTypeUrlSlug } from "../../config";

const getItems = (uid, params = {}) => strapi.db.query(uid).findMany(params);

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

const generateBrandWithModelLinks = (brand, productTypeSlug) => [
    generateLink(`/${productTypeSlug}/${brand.slug}`),
    ...brand.models.map((model) =>
        generateLink(`/${productTypeSlug}/${brand.slug}/model-${model.slug}`)
    ),
];

const generateSitemap = async () => {
    const [
        spareParts,
        wheels,
        tires,
        cabins,
        articles,
        cars,
        brands,
        tireBrands,
    ] = await Promise.all([
        getItems("api::spare-part.spare-part", { populate: ["brand"] }),
        getItems("api::wheel.wheel", { populate: ["brand"] }),
        getItems("api::tire.tire", { populate: ["brand"] }),
        getItems("api::cabin.cabin", { populate: ["brand"] }),
        getItems("api::article.article"),
        getItems("api::car.car"),
        getItems("api::brand.brand", { populate: ["models"] }),
        getItems("api::tire-brand.tire-brand"),
    ]);

    let links = [
        ...generateProductLinks(spareParts),
        ...generateProductLinks(wheels),
        ...generateProductLinks(tires),
        ...generateProductLinks(cabins),
        ...articles.map((item) => generateLink(`/articles/${item.slug}`)),
        ...cars.map((item) => generateLink(`/awaiting-cars/${item.slug}`)),
        ...brands
            .map((item) => [
                ...generateBrandWithModelLinks(item, "spare-parts"),
                ...generateBrandWithModelLinks(item, "wheels"),
                ...generateBrandWithModelLinks(item, "cabins"),
            ])
            .flat(),
        ...tireBrands.map((item) => generateLink(`/tires/${item.slug}`)),
    ];

    let clientUrl = strapi.config.get("server.clientUrl") as string;
    const sitemap = new SitemapStream({ hostname: clientUrl });
    const writeStream = fs.createWriteStream(
        process.cwd() + "/public/uploads/sitemap.xml"
    );
    sitemap.pipe(writeStream);
    [...STATIC_LINKS, ...links].forEach((item) => {
        sitemap.write(item);
    });
    sitemap.end();
    strapi.log.info("SITEMAP GENERATED");
};

let timeoutId = null;

const TWENTY_MINUTES = 1200000;

const scheduleGenerateSitemap = () => {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(async () => {
        timeoutId = null;
        await generateSitemap();
    }, TWENTY_MINUTES);
};

export default scheduleGenerateSitemap;
