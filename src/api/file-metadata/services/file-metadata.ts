import sharp from "sharp";

export default ({ strapi }) => {
    strapi.db.lifecycles.subscribe({
        models: ["plugin::upload.file"],
        afterUpdate(event) {
            console.log("change metadata");
        },
    });
};
