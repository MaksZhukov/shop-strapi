import {
    sendNewProductsToEmail,
    sendProductsInCSVToEmail,
    updateCurrency,
} from "../src/services";
import { sendYMLToEmail } from "../src/services/yml/yml";

export default {
    "0 9 * * *": sendNewProductsToEmail,
    "1 9 * * *": sendProductsInCSVToEmail,
    "2 9 * * *": sendYMLToEmail,
    "3 9 * * *": () => {
        strapi.service("plugin::telegram.service")?.runTelegramMessages();
    },
    "0 */12 * * *": updateCurrency
};
