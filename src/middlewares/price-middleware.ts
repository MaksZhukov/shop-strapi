export default (config, { strapi }) => {
    return async (context, next) => {
        await next();
        const { body } = context;
        const coefficient = await strapi
            .service("plugin::internal.data")
            .getCurrencyCoefficient();

        if (body && coefficient) {
            if (Array.isArray(body.data)) {
                body.data.forEach((item) => {
                    let { price, discountPrice } = item;

                    item.priceUSD = price * coefficient.usd;
                    item.priceRUB = price * coefficient.rub;
                    if (discountPrice) {
                        item.discountPriceUSD = discountPrice * coefficient.usd;
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
