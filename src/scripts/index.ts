import { updateAltTextForProductImages } from "../services";

const runScripts = async (strapi) => {
    const spareParts = await strapi.db
        .query("api::spare-part.spare-part")
        .findMany({ populate: ["images", "seo"] });
    const cabins = await strapi.db
        .query("api::cabin.cabin")
        .findMany({ populate: ["images", "seo"] });
    const wheels = await strapi.db
        .query("api::wheel.wheel")
        .findMany({ populate: ["images", "seo"] });
    const tires = await strapi.db
        .query("api::tire.tire")
        .findMany({ populate: ["images", "seo"] });
    [...spareParts, ...cabins, ...wheels, ...tires].forEach((item) => {
        updateAltTextForProductImages(item, item.images);
    });
};

export default runScripts;
