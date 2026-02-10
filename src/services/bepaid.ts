import axios from "axios";
import axiosRetry from "axios-retry";
import https from "https";

axiosRetry(axios, {
    retries: 3,
    retryDelay: () => 500,
});

export const ORDER_EXPIRED_TIME = 600000 * 2;
const BE_PAID_HOST_URL = "https://checkout.bepaid.by";

export const checkout = async (
    user: any | null,
    description: string,
    amount: number,
    products: any[],
    paymentMethodType: string,
    withNotification = true
) => {
    const bepaidShopId = strapi.config.get("server.bepaidShopId");
    const bepaidShopKey = strapi.config.get("server.bepaidShopKey");
    const serverUrl = strapi.config.get("server.serverUrl");

    const internalData = await strapi.service("plugin::internal.data").find({
        populate: { bePaidTestModeUsers: true },
    });

    const isTestModeUser = internalData?.bePaidTestModeUsers?.some(
        (item: any) => item.id === user?.id
    );

    let timeCheckoutStart = performance.now();
    const { data } = await axios.post(
        `${BE_PAID_HOST_URL}/ctp/api/checkouts`,
        {
            checkout: {
                test: isTestModeUser,
                transaction_type: "payment",
                order: {
                    amount: amount * 100,
                    currency: "BYN",
                    description,
                    expired_at: new Date(
                        new Date().getTime() + ORDER_EXPIRED_TIME
                    ),
                },
                settings: {
                    language: "ru",
                    customer_fields: {
                        visible: [
                            "first_name",
                            "last_name",
                            "phone",
                            "email",
                            "address",
                        ],
                    },
                    notification_url: `${serverUrl}/api/orders/notification?products=${JSON.stringify(
                        products
                    )}`,
                },
                payment_method: {
                    types: [paymentMethodType],
                },
            },
        },
        {
            auth: {
                username: bepaidShopId as string,
                password: bepaidShopKey as string,
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
            html: `checkout: ${timeCheckoutEnd}, app instance: ${process.env.NODE_APP_INSTANCE}`,
        });
    }
    return data.checkout;
};

export const checkoutV1 = async (
    user: any | null,
    order: any,
    description: string,
    amount: number
) => {
    const bepaidShopId = strapi.config.get<string>("server.bepaidShopId");
    const bepaidShopKey = strapi.config.get<string>("server.bepaidShopKey");
    const serverUrl = strapi.config.get<string>("server.serverUrl");

    const internalData = await strapi.service("plugin::internal.data").find({
        populate: { bePaidTestModeUsers: true },
    });

    const isTestModeUser = internalData?.bePaidTestModeUsers?.some(
        (item: any) => item.id === user?.id
    );

    let timeCheckoutStart = performance.now();
    const { data } = await axios.post(
        `${BE_PAID_HOST_URL}/ctp/api/checkouts`,
        {
            checkout: {
                test: true,
                transaction_type: "payment",
                order: {
                    amount: amount * 100,
                    currency: "BYN",
                    description,
                    expired_at: new Date(
                        new Date().getTime() + ORDER_EXPIRED_TIME
                    ),
                },
                customer: {
                    email: order.email,
                    first_name: order.username,
                    last_name: order.surname,
                    phone: order.phone,
                    address: order.address,
                },
                settings: {
                    language: "ru",
                    customer_fields: {
                        visible: [],
                    },
                    notification_url: `${serverUrl}/api/orders/notification-v1?orderId=${order.id}`,
                },
                payment_method: {
                    types: ["credit_card"],
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

    let timeCheckoutEnd = performance.now() - timeCheckoutStart;
    strapi.plugins.email.services.email.send({
        to: "maks_zhukov_97@mail.ru",
        from: strapi.plugins.email.config("providerOptions.username"),
        subject: "Strapi BE Checkout Log Time",
        html: `checkout: ${timeCheckoutEnd}, app instance: ${process.env.NODE_APP_INSTANCE}`,
    });

    return data.checkout;
};
