import axios from "axios";
import { encrypt } from "./crypto";

export const checkout = async (product: any) => {
    const bepaidShopId = strapi.config.get("server.bepaidShopId");
    const bepaidShopKey = strapi.config.get("server.bepaidShopKey");
    const trackingId = encrypt(
        JSON.stringify({ id: product.id, type: product.type })
    );
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
                },
                settings: {
                    language: "ru",
                    customer_fields: {
                        visible: ["first_name", "phone", "email"],
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
    return { ...data.checkout, trackingId };
};
