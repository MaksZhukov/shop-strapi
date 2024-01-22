import {
    generateProductFullDescription,
    sendNewProductsToEmail,
    sendProductsInCSVToEmail,
    updateCurrency,
    updateImagesMetadata,
} from "../src/services";
import { sendYMLsToEmail } from "../src/services/yml/yml";

export default {
    // "0 9 * * *": sendNewProductsToEmail,
    // "1 9 * * *": sendProductsInCSVToEmail,
    // "2 9 * * *": sendYMLsToEmail,
    "0 0 * * *": updateImagesMetadata,
    "0 1 * * *": generateProductFullDescription,
    "0 */12 * * *": updateCurrency,
};
