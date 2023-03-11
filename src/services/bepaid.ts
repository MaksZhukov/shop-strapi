import axios from "axios";
import axiosRetry from "axios-retry";

axiosRetry(axios, {
    retries: 3,
    retryDelay: () => 500,
});

const TWENTY_MINUTES = 600000 * 2;

export const checkout = async (product: any, trackingId: string) => {
    const bepaidShopId = strapi.config.get("server.bepaidShopId");
    const bepaidShopKey = strapi.config.get("server.bepaidShopKey");
    const serverUrl = strapi.config.get("server.serverUrl");
    let timeCheckoutStart = performance.now();
    const { data } = await axios.post(
        "https://checkout.bepaid.by/ctp/api/checkouts",
        {
            checkout: {
                transaction_type: "payment",
                order: {
                    amount: (product.discountPrice || product.price) * 100,
                    currency: "BYN",
                    description: product.h1,
                    tracking_id: trackingId,
                    expired_at: new Date(new Date().getTime() + TWENTY_MINUTES),
                },
                settings: {
                    language: "ru",
                    customer_fields: {
                        visible: ["first_name", "phone", "email", "address"],
                    },
                    notification_url: `${serverUrl}/api/orders/notification`,
                },
            },
        },
        {
            auth: {
                username: bepaidShopId,
                password: bepaidShopKey,
            },
        }
    );
    let timeCheckoutEnd = performance.now() - timeCheckoutStart;
    strapi.plugins.email.services.email.send({
        to: "maks_zhukov_97@mail.ru",
        from: strapi.plugins.email.config("providerOptions.username"),
        subject: "Checkout log time",
        html: `checkout ${timeCheckoutEnd}`,
    });
    return data.checkout;
};
