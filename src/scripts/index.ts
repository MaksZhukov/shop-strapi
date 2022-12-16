import { defaultProductSeoConfig } from "./config";

const addDefaultPageProductSeo = async (strapi) => {
    const data = await strapi.service("api::page-product.page-product").find({
        populate: Object.keys(defaultProductSeoConfig),
    });
    let hasUpdates = false;
    Object.keys(defaultProductSeoConfig).forEach((key) => {
        if (!data[key]) {
            hasUpdates = true;
            data[key] = defaultProductSeoConfig[key];
        }
    });
    if (hasUpdates) {
        await strapi
            .service("api::page-product.page-product")
            .createOrUpdate({ data });
    }
};

const runScripts = (strapi) => {
    addDefaultPageProductSeo(strapi);
};

export default runScripts;
