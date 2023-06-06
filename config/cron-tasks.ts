import {
    sendNewProductsToEmail,
    sendProductsInCSVToEmail,
    updateCurrency,
} from "../src/services";
import { checkout } from "../src/services/bepaid";
import { sendYMLToEmail } from "../src/services/yml/yml";

export default {
    "0 9 * * *": sendNewProductsToEmail,
    "1 9 * * *": sendProductsInCSVToEmail,
    // "2 9 * * *": sendYMLToEmail,
    "0 */12 * * *": updateCurrency,
    "*/5 * * * *": async () => {
        const { startFakeCheckouts }: any = await strapi
            .service("plugin::internal.data")
            .find({});
        if (startFakeCheckouts) {
            const mockProducts = [{ price: 1, h1: "mock" }];
            checkout(
                mockProducts.map((item) => item.h1).join(", "),
                mockProducts.reduce((prev, curr) => prev + curr.price, 0),
                [{ id: 1, type: "wheel" }],
                false
            );
        }
    },
};
