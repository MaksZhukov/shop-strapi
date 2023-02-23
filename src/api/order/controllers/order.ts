/**
 *  order controller
 */

import { factories } from "@strapi/strapi";
import axios from "axios";

const PRODUCT_API_UID_BY_TYPE = {
    cabin: "api::cabin.cabin",
    wheel: "api::wheel.wheel",
    tire: "api::tire.tire",
    "spare-part": "api::spare-part.spare-part",
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
                const res = await axios.post(
                    "https://checkout.bepaid.by/ctp/api/checkouts",
                    {
                        checkout: {
                            transaction_type: "payment",
                            order: {
                                amount: product.price * 100,
                                currency: "BYN",
                                description: product.h1,
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
                return this.transformResponse(res.data);
            }
        },
        async create(ctx) {
            const { token, type, productID } = ctx.query;
            const bepaidShopId = strapi.config.get("server.bepaidShopId");
            const bepaidShopKey = strapi.config.get("server.bepaidShopKey");
            if (token) {
                const { data } = await axios(
                    `https://checkout.bepaid.by/ctp/api/checkouts/${token}`,
                    {
                        auth: {
                            username: bepaidShopId,
                            password: bepaidShopKey,
                        },
                    }
                );
                ctx.request.body = {
                    data: {
                        id: token,
                        username: data.checkout.customer.first_name,
                        phone: data.checkout.customer.phone,
                        email: data.checkout.customer.email,
                        products: [
                            {
                                __component: `product.${type}`,
                                product: productID,
                            },
                        ],
                    },
                };
                return super.create(ctx);
            }
        },
    })
);
