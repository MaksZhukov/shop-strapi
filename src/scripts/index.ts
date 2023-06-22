import { productTypeUrlSlug } from "../config";
import { updateImageMetadata } from "../services/imageMetadata";

const daysInMilliseconds = 86400000 * 1;

const runScripts = async (strapi) => {
    let clientUrl = strapi.config.get("server.clientUrl");
    const spareParts = await strapi.db
        .query("api::spare-part.spare-part")
        .findMany({
            where: {
                $or: [
                    {
                        updatedAt: {
                            $gt: new Date().getTime() - daysInMilliseconds,
                        },
                    },
                    {
                        createdAt: {
                            $gt: new Date().getTime() - daysInMilliseconds,
                        },
                    },
                ],
            },
            populate: ["images"],
        });

    spareParts.forEach((item) => {
        item.images?.forEach((image) => {
            updateImageMetadata(
                image.url,
                `${clientUrl}/${productTypeUrlSlug[item.type]}/${item.slug}`
            );
        });
    });

    const cabins = await strapi.db.query("api::cabin.cabin").findMany({
        where: {
            $or: [
                {
                    updatedAt: {
                        $gt: new Date().getTime() - daysInMilliseconds,
                    },
                },
                {
                    createdAt: {
                        $gt: new Date().getTime() - daysInMilliseconds,
                    },
                },
            ],
        },
        populate: ["images"],
    });

    cabins.forEach((item) => {
        item.images?.forEach((image) => {
            updateImageMetadata(
                image.url,
                `${clientUrl}/${productTypeUrlSlug[item.type]}/${item.slug}`
            );
        });
    });
};

export default runScripts;
