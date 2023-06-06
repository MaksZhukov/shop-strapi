import axios from "axios";
import axiosRetry from "axios-retry";
import https from "https";
import qs from "qs";

axiosRetry(axios, {
    retries: 3,
    retryDelay: () => 500,
});

const TWENTY_MINUTES = 600000 * 2;

export const checkout = async (
    description: string,
    amount: number,
    products: any[],
    withNotification = true
) => {
    const bepaidShopId = strapi.config.get("server.bepaidShopId");
    const bepaidShopKey = strapi.config.get("server.bepaidShopKey");
    const serverUrl = strapi.config.get("server.serverUrl");
    let timeCheckoutStart = performance.now();
    const test = await strapi
        .service("plugin::internal.data")
        .getBePaidTestMode();
    const { data } = await axios.post(
        "https://checkout.bepaid.by/ctp/api/checkouts",
        {
            checkout: {
                test,
                transaction_type: "payment",
                order: {
                    amount: amount * 100,
                    currency: "BYN",
                    description,
                    expired_at: new Date(new Date().getTime() + TWENTY_MINUTES),
                },
                settings: {
                    language: "ru",
                    customer_fields: {
                        visible: ["first_name", "phone", "email", "address"],
                    },
                    notification_url: `${serverUrl}/api/orders/notification?products=${JSON.stringify(
                        products
                    )}`,
                },
            },
        },
        {
            auth: {
                username: bepaidShopId,
                password: bepaidShopKey,
            },
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        }
    );
    if (withNotification) {
        let timeCheckoutEnd = performance.now() - timeCheckoutStart;
        strapi.plugins.email.services.email.send({
            to: "maks_zhukov_97@mail.ru",
            from: strapi.plugins.email.config("providerOptions.username"),
            subject: "Strapi BE Checkout Log Time",
            html: `checkout ${timeCheckoutEnd}`,
        });
    }
    return data.checkout;
};
