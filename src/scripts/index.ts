import { updateAltTextForProductImages } from "../services";

const runScripts = async (strapi) => {
    const spareParts = await strapi.db
        .query("api::spare-part.spare-part")
        .findMany({ populate: ["images"] });
    const cabins = await strapi.db
        .query("api::cabin.cabin")
        .findMany({ populate: ["images"] });
    const wheels = await strapi.db
        .query("api::wheel.wheel")
        .findMany({ populate: ["images"] });
    const tires = await strapi.db
        .query("api::tire.tire")
        .findMany({ populate: ["images"] });
    [...spareParts, ...cabins, ...wheels, ...tires].forEach((item) => {
        updateAltTextForProductImages(item);
    });
};

export default runScripts;
