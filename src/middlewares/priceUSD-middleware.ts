export default (config, { strapi }) => {
    return async (context, next) => {
        await next();
        const { body } = context;
        let coefficient = strapi
            .service("api::currency-freaks.currency-freaks")
            .getCoefficient();
        if (body) {
            if (Array.isArray(body.data)) {
                body.data.forEach((item) => {
                    let { price, discountPrice } = item.attributes;
                    item.attributes.priceUSD = price * coefficient;
                    item.attributes.discountPriceUSD =
                        discountPrice * coefficient;
                });
            } else {
                body.data.attributes.priceUSD =
                    body.data.attributes.price * coefficient;
                body.data.attributes.discountPriceUSD =
                    body.data.attributes.discountPrice * coefficient;
            }
        }
    };
};
