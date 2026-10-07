import { randomUUID } from "crypto";
import { promises } from "fs";
import path from "path";
import sharp from "sharp";
import { productTypeUrlSlug } from "../config";

export const updateImageMetadata = async (url, productUrl: string) => {
    const pathToImage = path.join(process.cwd(), "public", url);
    // same directory as the original, so the final rename stays on one
    // filesystem and is atomic; the extension tells sharp the output format
    const pathToTmpImage = path.join(
        path.dirname(pathToImage),
        `tmp_${randomUUID()}_${path.basename(pathToImage)}`
    );
    try {
        // the original is only read here; it is replaced only after the new
        // file is fully written, so a failed write can't truncate or remove it
        await sharp(pathToImage)
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
            .toFile(pathToTmpImage);
        await promises.rename(pathToTmpImage, pathToImage);
    } catch (err) {
        strapi.log.error(
            `updateImageMetadata failed for ${url} (product ${productUrl}): ${err}`
        );
        strapi.plugins.email.services.email.send({
            to: "maks_zhukov_97@mail.ru",
            from: strapi.plugins.email.config("providerOptions.username"),
            subject: "Strapi BE Error",
            html: `<b>DESCRIPTION</b>: ${err.toString()}<br>
                   <b>URL</b>: ${url}<br>
                   <b>PRODUCT URL</b>: ${productUrl}<br>`,
        });
    } finally {
        await promises.rm(pathToTmpImage, { force: true });
    }
};
