import { factories } from "@strapi/strapi";

let coefficient = null;

export default factories.createCoreService("plugin::internal.data", {
    //@ts-expect-error error
    async getCurrencyCoefficient() {
        if (!coefficient) {
            coefficient = (await super.find()).currencyCoefficient;
        }
        return coefficient;
    },
});
