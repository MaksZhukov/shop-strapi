/**
 *  order controller
 */

import { factories } from "@strapi/strapi";
import { checkout } from "../../../services/bepaid";
import { decrypt } from "../../../services/crypto";

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
                const data = await checkout(product);
                return { data };
            }
        },
        async notification(ctx) {
            const {
                status,
                tracking_id: trackingId,
                customer,
                billing_address,
            } = ctx.request.body.transaction;
            strapi.plugins.email.services.email.send({
                to: "maks_zhukov_97@mail.ru",
                from: strapi.plugins.email.config("providerOptions.username"),
                subject: "Order Notification",
                html: JSON.stringify(ctx.request.body.transaction),
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
                                username: billing_address?.first_name,
                                phone: billing_address?.phone,
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
