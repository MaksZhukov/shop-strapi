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
        await promises.unlink(pathToTmpImage);
    } catch (err) {
        strapi.plugins.email.services.email.send({
            to: "maks_zhukov_97@mail.ru",
            from: strapi.plugins.email.config("providerOptions.username"),
            subject: "Strapi BE Error",
            html: `<b>DESCRIPTION</b>: ${err.toString()}<br>
                   <b>URL</b>: ${url}<br>
                   <b>PRODUCT URL</b>: ${productUrl}<br>`,
        });
    }
};

export const scheduleUpdateImageMetadataAfterCreateProduct = (data, apiUID) => {
    let clientUrl = strapi.config.get("server.clientUrl");
    setTimeout(async () => {
        const entity = await strapi.service(apiUID).findOne(data.id, {
            populate: { images: true, brand: true },
        });
        entity.images?.forEach((item) => {
            updateImageMetadata(
                item.url,
                `${clientUrl}/${productTypeUrlSlug[entity.type]}/${
                    entity.brand?.slug
                }/${entity.slug}`
            );
        });
    }, 100);
};

export const scheduleUpdateImageMetadataBeforeUpdateProduct = async (
    data,
    apiUID
) => {
    let clientUrl = strapi.config.get("server.clientUrl");
    const entityBeforeUpdate = await strapi
        .service(apiUID)
        .findOne(data.params.where.id, {
            populate: { images: true, brand: true },
        });
    const paramsImagesIDs = data.params.data.images || [];
    let imageIDs = entityBeforeUpdate.images
        ? paramsImagesIDs.filter(
              (id) => !entityBeforeUpdate.images.some((item) => item.id === id)
          )
        : paramsImagesIDs;
    strapi.plugins.upload.services.upload
        .findMany({ filters: { id: imageIDs } })
        .then((images) => {
            images.forEach((item) => {
                updateImageMetadata(
                    item.url,
                    `${clientUrl}/${
                        productTypeUrlSlug[entityBeforeUpdate.type]
                    }/${entityBeforeUpdate.brand?.slug}/${
                        entityBeforeUpdate.slug
                    }`
                );
            });
        });
};
