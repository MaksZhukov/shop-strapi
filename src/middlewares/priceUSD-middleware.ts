export default (config, { strapi }) => {
    return async (context, next) => {
        await next();
        const { body } = context;
        let coefficient = strapi
            .service("plugin::internal.data")
            .getCurrencyCoefficient();

        if (body) {
            if (Array.isArray(body.data)) {
                body.data.forEach((item) => {
                    let { price, discountPrice } = item;
                    item.priceUSD = price * coefficient;
                    if (discountPrice) {
                        item.discountPriceUSD =
                            discountPrice * coefficient;
                    }
                });
            } else {
                body.data.priceUSD =
                    body.data.price * coefficient;
                if (body.data.discountPrice) {
                    body.data.discountPriceUSD =
                        body.data.discountPrice * coefficient;
                }
            }
        }
    };
};
