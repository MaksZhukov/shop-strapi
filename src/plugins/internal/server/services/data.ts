import { factories } from "@strapi/strapi";

export default factories.createCoreService(
    "plugin::internal.data",
    //@ts-expect-error error
    function () {
        return {
            coefficient: 0,
            bePaidTestMode: false,
            async initiate() {
                const {
                    bePaidTestMode: bePaidTestModeValue,
                    currencyCoefficient,
                } = await super.find();
                this.coefficient = currencyCoefficient;
                this.bePaidTestMode = bePaidTestModeValue;
            },
            getCurrencyCoefficient() {
                return this.coefficient;
            },
            setCurrencyCoefficient(value: number) {
                this.coefficient = value;
            },
            setBePaidTestMode(value: boolean) {
                this.bePaidTestMode = value;
            },
            getBePaidTestMode() {
                return this.bePaidTestMode;
            },
        };
    }
);
