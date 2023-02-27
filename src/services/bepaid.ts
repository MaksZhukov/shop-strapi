import axios from "axios";
import { encrypt } from "./crypto";

const TEN_MINUTES = 600000;

export const checkout = async (product: any, trackingId: string) => {
    const bepaidShopId = strapi.config.get("server.bepaidShopId");
    const bepaidShopKey = strapi.config.get("server.bepaidShopKey");
    const serverUrl = strapi.config.get("server.serverUrl");
    const { data } = await axios.post(
        "https://checkout.bepaid.by/ctp/api/checkouts",
        {
            checkout: {
                transaction_type: "payment",
                test: true,
                order: {
                    amount: (product.discountPrice || product.price) * 100,
                    currency: "BYN",
                    description: product.h1,
                    tracking_id: trackingId,
                    expired_at: new Date(new Date().getTime() + TEN_MINUTES),
                },
                settings: {
                    language: "ru",
                    customer_fields: {
                        visible: ["first_name", "phone", "email", 'address'],
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
    return data.checkout;
};
