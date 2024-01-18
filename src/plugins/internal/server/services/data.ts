import { factories } from "@strapi/strapi";

export default factories.createCoreService(
    "plugin::internal.data",
    //@ts-expect-error error
    function () {
        return {
            currencyCoefficient: {
                usd: 0,
                rub: 0,
            },
            bePaidTestMode: false,
            async initiate() {
                const {
                    bePaidTestMode: bePaidTestModeValue,
                    currencyCoefficient,
                } = await super.find({
                    populate: { currencyCoefficient: true },
                });
                if (
                    currencyCoefficient &&
                    currencyCoefficient.usd &&
                    currencyCoefficient.rub
                ) {
                    this.currencyCoefficient = currencyCoefficient;
                }
                console.log(
                    "INIT_CURRENCY_COEFFICIENT",
                    currencyCoefficient,
                    process.env.NODE_APP_INSTANCE
                );
                this.bePaidTestMode = bePaidTestModeValue;
            },
            getCurrencyCoefficient() {
                return this.currencyCoefficient;
            },
            setCurrencyCoefficient(currencyCoefficient: {
                usd: number;
                rub: number;
            }) {
                this.currencyCoefficient = currencyCoefficient;
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
