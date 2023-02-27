/**
 *  order controller
 */

import { factories } from "@strapi/strapi";
import { checkout } from "../../../services/bepaid";
import { decrypt, encrypt } from "../../../services/crypto";

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
                const trackingId = encrypt(JSON.stringify({ id, type }));
                const [product, order] = await Promise.all([
                    strapi.db
                        .query(PRODUCT_API_UID_BY_TYPE[type])
                        .findOne({ where: { id } }),
                    strapi.db
                        .query("api::order.order")
                        .findOne({ where: { transactionId: trackingId } }),
                ]);
                // if (order) {
                //     return ctx.badRequest("product is ordered");
                // }
                const data = await checkout(product, trackingId);
                return { data };
            }
        },
        async notification(ctx) {
            strapi.plugins.email.services.email.send({
                to: "maks_zhukov_97@mail.ru",
                from: strapi.plugins.email.config("providerOptions.username"),
                subject: "Order Notification",
                html: JSON.stringify(ctx.request.body),
            });
            const {
                status,
                amount,
                description,
                tracking_id: trackingId,
                customer,
                billing_address,
            } = ctx.request.body.transaction || {};
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
                    const [entry] = await Promise.all([
                        strapi.entityService.create("api::order.order", {
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
                        }),
                        strapi.db
                            .query(PRODUCT_API_UID_BY_TYPE[type])
                            .update({ where: { id }, data: { sold: true } }),
                    ]);
                    strapi.plugins.email.services.email.send({
                        to: customer?.email,
                        from: strapi.plugins.email.config(
                            "providerOptions.username"
                        ),
                        subject: "Заказ на razbor-auto.by",
                        html: `<b>Товар</b>: ${description}<br>
					   <b>Стоимость</b>: ${(amount / 100).toFixed(2)} BYN<br> 
					   <b>Адрес доставки</b>: ${billing_address?.address}<br> 
					   `,
                    });
                    return { data: entry };
                }
            }
            return { data: {} };
        },
    })
);
