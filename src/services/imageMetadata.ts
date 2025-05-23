import { promises } from "fs";
import path from "path";
import sharp from "sharp";
import { productTypeUrlSlug } from "../config";

export const updateImageMetadata = async (url, productUrl: string) => {
    const timeChangeImageMetadataStart = performance.now();
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
