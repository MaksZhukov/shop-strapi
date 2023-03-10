import {
    sendNewProductsToEmail,
    sendProductsInCSVToEmail,
    updateCurrency,
} from "../src/services";
import { checkout } from "../src/services/bepaid";

export default {
    "0 9 * * *": sendNewProductsToEmail,
    "1 9 * * *": sendProductsInCSVToEmail,
    "0 */12 * * *": updateCurrency,
    "*/15 * * * *": async () => {
        const { startFakeCheckouts }: any = await strapi
            .service("plugin::internal.data")
            .find({});
        if (startFakeCheckouts) {
            const mockProduct = { price: 1, h1: "mock" };
            checkout(mockProduct, "123456789");
        }
    },
};
