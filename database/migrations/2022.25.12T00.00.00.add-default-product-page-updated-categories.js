const DEFAULT_PRODUCT_SPARE_PART_SEO = {
    title: "{h1} {brand} {model} купить с доставкой",
    description:
        "{h1} {brand} {model} купить с доставкой. Огромный выбор запчастей и марок авто. У нас есть практически все.",
    keywords: `{h1} {brand} {model} купить`,
};

const DEFAULT_PRODUCT_WHEEL_SEO = {
    title: "{h1} {brand} {model} купить бу для вашего авто.",
    description:
        "Предлагаем {h1} {brand} {model} купить для авто. Выбор размера, всегда в наличии, принимаем заказы на запчасти",
    keywords: `{h1} {brand} {model} купить`,
};

const DEFAULT_PRODUCT_TIRE_SEO = {
    title: "{h1} {brand} купить бу в хорошем состоянии",
    description:
        "В наличии {h1} {brand} купить по доступной цене. Огромный ассортимент покрышек на различные авто. Подберем нужное",
    keywords: `{h1} {brand} купить`,
};

const DEFAULT_PRODUCT_CABIN_SEO = {
    title: "{h1} {brand} {model} купить с доставкой",
    description:
        "{h1} {brand} {model} купить с доставкой. Огромный выбор салонов. У нас есть практически все.",
    keywords: `{h1} {brand} {model} купить`,
};

const data = {
    defaultSparePartSeo: DEFAULT_PRODUCT_SPARE_PART_SEO,
    defaultWheelSeo: DEFAULT_PRODUCT_WHEEL_SEO,
    defaultCabinSeo: DEFAULT_PRODUCT_CABIN_SEO,
    defaultTireSeo: DEFAULT_PRODUCT_TIRE_SEO,
};

async function up() {
    await strapi
        .service("api::page-product.page-product")
        .createOrUpdate({ data });
}

module.exports = { up };
