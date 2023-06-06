import { factories } from "@strapi/strapi";

let coefficient = null;
let bePaidTestMode = null;

export default factories.createCoreService("plugin::internal.data", {
    async getCurrencyCoefficient() {
        if (!coefficient) {
            coefficient = (await super.find()).currencyCoefficient;
        }
        return coefficient;
    },
    setBePaidTestMode(value: boolean) {
        bePaidTestMode = value;
    },
    async getBePaidTestMode() {
        if (bePaidTestMode === null) {
            bePaidTestMode = (await super.find()).bePaidTestMode;
        }
        return bePaidTestMode;
    },
});
