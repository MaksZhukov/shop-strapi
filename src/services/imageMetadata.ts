import sharp from "sharp";
import { promises } from "fs";
import path from "path";
const pathToUploads = path.join(process.cwd(), "public", "uploads");

export const updateImageMetadata = async (name) => {
    try {
        await sharp(`${pathToUploads}/${name}`).toFile(
            `${pathToUploads}/tmp_${name}`
        );
        await sharp(`${pathToUploads}/tmp_${name}`)
            .withMetadata({
                exif: {
                    IFD0: {
                        Artist: "ARTIST", // WORKS
                        ImageDescription: "LINK", // WORKS
                        XPSubject: "SUBJECT", // WORKS
                        XPTitle: "TITLE", // WORKS,
                    },
                },
            })
            .toFile(`${pathToUploads}/${name}`);
        await promises.unlink(`${pathToUploads}/tmp_${name}`);
    } catch (err) {
        console.log(err);
    }
};
