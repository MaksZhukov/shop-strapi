export default (config, { strapi }) => {
    return async (context, next) => {
        await next();
        const { body } = context;
        const coefficient = strapi
            .service("plugin::internal.data")
            .getCurrencyCoefficient();

        if (body) {
            if (Array.isArray(body.data)) {
                body.data.forEach((item) => {
                    let { price, discountPrice } = item;

                    if (coefficient) {
                        item.priceUSD = price * coefficient.usd;
                        item.priceRUB = price * coefficient.rub;
                        if (discountPrice) {
                            item.discountPriceUSD =
                                discountPrice * coefficient.usd;
                        }
                    } else {
                        console.log(
                            "PRICE_MIDDLEWARE",
                            strapi.service("plugin::internal.data"),
                            strapi.service("plugin::internal.data")
                                .currencyCoefficient,
                            strapi
                                .service("plugin::internal.data")
                                .getCurrencyCoefficient().coefficient,
                            process.env.NODE_APP_INSTANCE
                        );
                    }
                });
            } else {
                body.data.priceUSD = body.data.price * coefficient.usd;
                body.data.priceRUB = body.data.price * coefficient.rub;
                if (body.data.discountPrice) {
                    body.data.discountPriceUSD =
                        body.data.discountPrice * coefficient.usd;
                }
            }
        }
    };
};
