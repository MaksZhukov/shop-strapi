import { sendNewProductsToEmail, updateCurrency } from "../src/services";

export default {
    "0 9 * * *": sendNewProductsToEmail,
    "0 */12 * * *": updateCurrency,
};
