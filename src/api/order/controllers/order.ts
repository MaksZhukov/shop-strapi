/**
 *  order controller
 */

import { factories } from "@strapi/strapi";
import crypto from "crypto";
import axios from "axios";

const algorithm = strapi.config.get("server.cryptoAlgorithm");
const key = strapi.config.get("server.cryptoKey");
const iv = strapi.config.get("server.cryptoIV");

const encrypt = (text: string) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = cipher.update(text, "utf8", "hex") + cipher.final("hex");
    return encrypted;
};

const decrypt = (val: string) => {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const decrypted =
        decipher.update(val, "hex", "utf8") + decipher.final("utf8");
    return JSON.parse(decrypted);
};

const PRODUCT_API_UID_BY_TYPE = {
    cabin: "api::cabin.cabin",
    wheel: "api::wheel.wheel",
    tire: "api::tire.tire",
    sparePart: "api::spare-part.spare-part",
};

const COMPONENT_PRODUCT_TYPE = {
    sparePart: "spare-part",
};

export default factories.createCoreController(
    "api::order.order",
    ({ strapi }) => ({
        async checkout(ctx) {
            const { id } = ctx.params;
            const { type } = ctx.query;
            const uid = PRODUCT_API_UID_BY_TYPE[type];
            if (uid) {
                const product = await strapi.db
                    .query(PRODUCT_API_UID_BY_TYPE[type])
                    .findOne(id);
                const bepaidShopId = strapi.config.get("server.bepaidShopId");
                const bepaidShopKey = strapi.config.get("server.bepaidShopKey");
                const trackingId = encrypt(
                    JSON.stringify({ id: product.id, type: product.type })
                );
                const res = await axios.post(
                    "https://checkout.bepaid.by/ctp/api/checkouts",
                    {
                        checkout: {
                            transaction_type: "payment",
                            test: true,
                            order: {
                                amount:
                                    (product.discountPrice || product.price) *
                                    100,
                                currency: "BYN",
                                description: product.h1,
                                tracking_id: trackingId,
                            },
                            settings: {
                                language: "ru",
                                customer_fields: {
                                    visible: ["first_name", "phone", "email"],
                                },
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
                return { data: { ...res.data.checkout, trackingId } };
            }
        },
        async notification(ctx) {
            const {
                status,
                tracking_id: trackingId,
                customer,
            } = ctx.request.body.transaction;
            strapi.plugins.email.services.email.send({
                to: "maks_zhukov_97@mail.ru",
                from: strapi.plugins.email.config("providerOptions.username"),
                subject: "Razbor Auto Error",
                html: JSON.stringify(ctx.request.body),
            });
            if (status === "successful") {
                const order = await strapi.db
                    .query("api::order.order")
                    .findOne({
                        where: {
                            transactionId: trackingId,
                        },
                    });
                if (!order) {
                    const { id, type } = decrypt(trackingId);
                    const entry = await strapi.entityService.create(
                        "api::order.order",
                        {
                            data: {
                                username: customer?.first_name,
                                phone: customer?.phone,
                                email: customer?.email,
                                transactionId: trackingId,
                                products: [
                                    {
                                        __component: `product.${
                                            COMPONENT_PRODUCT_TYPE[type] || type
                                        }`,
                                        product: id,
                                    },
                                ],
                            },
                        }
                    );
                    return { data: entry };
                }
            }
            return { data: {} };
        },
    })
);
