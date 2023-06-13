import sharp from "sharp";
import { promises } from "fs";
import path from "path";
import { productTypeUrlSlug } from "../config";

export const updateImageMetadata = async (url, imageDescription) => {
    try {
        const pathToImage = path.join(process.cwd(), "public", url);
        const pathToTmpImage = path.join(
            process.cwd(),
            "public",
            url.replace("uploads/", "uploads/tmp")
        );
        await sharp(pathToImage).toFile(pathToTmpImage);
        await sharp(pathToTmpImage)
            .withMetadata({
                exif: {
                    IFD0: {
                        Artist: imageDescription, // WORKS
                        ImageDescription: imageDescription, // WORKS
                        XPSubject: imageDescription, // WORKS
                        XPTitle: imageDescription, // WORKS,
                    },
                },
            })
            .toFile(pathToImage);
        await promises.unlink(pathToTmpImage);
    } catch (err) {
        console.log(err);
    }
};

export const scheduleUpdateImageMetadata = (data, apiUID) => {
    let clientUrl = strapi.config.get("server.clientUrl");
    setTimeout(async () => {
        const entity = await strapi.service(apiUID).findOne(data.id, {
            populate: { images: true },
        });
        entity.images?.forEach((item) => {
            updateImageMetadata(
                item.url,
                `${clientUrl}/${productTypeUrlSlug[entity.type]}/${entity.slug}`
            );
        });
    }, 1000);
};
