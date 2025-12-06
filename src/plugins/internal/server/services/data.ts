import { factories } from "@strapi/strapi";

export default factories.createCoreService(
    "plugin::internal.data",
    function () {
        return {
            async getCurrencyCoefficient() {
                //@ts-expect-error error
                if (strapi.redis?.connections?.default?.client) {
                    const currencyCoefficient =
                        //@ts-expect-error error
                        await strapi.redis.connections.default.client.get(
                            "currencyCoefficient"
                        );
                    if (currencyCoefficient) {
                        return JSON.parse(currencyCoefficient);
                    } else {
                        const data = await super.find({
                            populate: { currencyCoefficient: true },
                        });
                        //@ts-expect-error error
                        await strapi.redis.connections.default.client.set(
                            "currencyCoefficient",
                            JSON.stringify(data.currencyCoefficient),
                            "EX",
                            3600
                        );
                        return data.currencyCoefficient;
                    }
                }
                const data = await super.find({
                    populate: { currencyCoefficient: true },
                });
                return data.currencyCoefficient;
            },
            setCurrencyCoefficient(currencyCoefficient: {
                usd: number;
                rub: number;
            }) {
                this.currencyCoefficient = currencyCoefficient;
            },
        };
    }
);
