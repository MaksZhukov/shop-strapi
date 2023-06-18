import { updateAltTextForProductImages } from "../services";

const runScripts = async (strapi) => {
    const tires = await strapi.db
        .query("api::tire.tire")
        .findMany({ populate: ["images"] });
    tires.forEach((item) => {
        updateAltTextForProductImages(item, item.images);
    });
};

export default runScripts;
