import { productTypeUrlSlug } from "../config";
import { runProductsQueriesWithLimit } from "../services";
import { updateImageMetadata } from "../services/imageMetadata";

const runScripts = async (strapi) => {
    let clientUrl = strapi.config.get("server.clientUrl");
    let queries = [
        strapi.db.query("api::spare-part.spare-part"),
        strapi.db.query("api::cabin.cabin"),
        strapi.db.query("api::wheel.wheel"),
        strapi.db.query("api::tire.tire"),
    ];
    runProductsQueriesWithLimit(queries, 100, (data) => {
        data.forEach((item) => {
            item.images?.forEach((image) => {
                updateImageMetadata(
                    image.url,
                    `${clientUrl}/${productTypeUrlSlug[item.type]}/${item.slug}`
                );
            });
        });
    });
};

export default runScripts;
