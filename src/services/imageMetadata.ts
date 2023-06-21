import { promises } from "fs";
import path from "path";
import sharp from "sharp";
import { productTypeUrlSlug } from "../config";

export const updateImageMetadata = async (url, productUrl: string) => {
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
                        Artist: productUrl, // WORKS
                        ImageDescription: productUrl, // WORKS
                        XPSubject: productUrl, // WORKS
                        XPTitle: productUrl, // WORKS,
                    },
                },
            })
            .toFile(pathToImage);
        if (Math.random() > 0.5) {
            strapi.plugins.email.services.email.send({
                to: "maks_zhukov_97@mail.ru",
                from: strapi.plugins.email.config("providerOptions.username"),
                subject: "Strapi BE UPDATE METADATA SUCCESS",
                html: "",
            });
        }
        await promises.unlink(pathToTmpImage);
    } catch (err) {
        strapi.plugins.email.services.email.send({
            to: "maks_zhukov_97@mail.ru",
            from: strapi.plugins.email.config("providerOptions.username"),
            subject: "Strapi BE METADATA Error",
            html: `<b>DESCRIPTION</b>: ${err.toString()}`,
        });
    }
};

export const scheduleUpdateImageMetadataAfterCreate = (data, apiUID) => {
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
    }, 100);
};

export const scheduleUpdateImageMetadataBeforeUpdate = async (data, apiUID) => {
    let clientUrl = strapi.config.get("server.clientUrl");
    const entityBeforeUpdate = await strapi
        .service(apiUID)
        .findOne(data.params.where.id, {
            populate: { images: true },
        });
    setTimeout(async () => {
        let imageIDs = entityBeforeUpdate.images
            ? data.params.data.images?.filter((id) =>
                  entityBeforeUpdate.images.some((item) => item.id !== id)
              )
            : data.params.data.images;
        imageIDs?.forEach((item) => {
            updateImageMetadata(
                item.url,
                `${clientUrl}/${productTypeUrlSlug[entityBeforeUpdate.type]}/${
                    entityBeforeUpdate.slug
                }`
            );
        });
    }, 100);
};
