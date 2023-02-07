import { factories } from "@strapi/strapi";

let coefficient = null;

export default factories.createCoreService("plugin::internal.data", {
    async getCurrencyCoefficient() {
        if (!coefficient) {
            coefficient = (await super.find()).currencyCoefficient;
        }
        return coefficient;
    },
});
