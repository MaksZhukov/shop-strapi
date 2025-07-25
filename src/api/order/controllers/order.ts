/**
 *  order controller
 */

import { factories } from "@strapi/strapi";
import { checkout } from "../../../services/bepaid";

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
            const { products = [], paymentMethodType = "credit_card" } =
                ctx.query;
            const coefficient = await strapi
                .service("plugin::internal.data")
                .getCurrencyCoefficient();
            const productsEntities = await Promise.all(
                (products as any[]).map((item) =>
                    strapi.db
                        .query(PRODUCT_API_UID_BY_TYPE[item.type])
                        .findOne({ where: { id: item.id } }),
                ),
            );
            if (productsEntities.some((item) => item.sold)) {
                return ctx.badRequest("one of the product is sold");
            }
            const data = await checkout(
                productsEntities
                    .map(
                        (item) =>
                            `${item.h1} ~${(
                                item.price * coefficient.usd
                            ).toFixed()}$ ~${(
                                item.price * coefficient.rub
                            ).toFixed()}₽`,
                    )
                    .join(", "),
                productsEntities.reduce(
                    (prev, curr) => prev + (curr.discountPrice || curr.price),
                    0,
                ),
                products as any[],
                paymentMethodType as string,
            );
            return { data };
        },
        async notification(ctx) {
            const {
                uid,
                status,
                amount,
                description,
                customer,
                billing_address,
            } = ctx.request.body.transaction || {};
            if (status === "successful") {
                const { products: rawProducts } = ctx.query;
                const products = JSON.parse(rawProducts as string);
                const productsEntities = await Promise.all(
                    products.map((item) =>
                        strapi.db
                            .query(PRODUCT_API_UID_BY_TYPE[item.type])
                            .findOne({ where: { id: item.id } }),
                    ),
                );
                if (productsEntities.some((item) => item.sold)) {
                    return ctx.badRequest("one of the product is sold");
                } else {
                    const entry = await strapi
                        .documents("api::order.order")
                        .create({
                            data: {
                                username: billing_address?.first_name,
                                surname: billing_address?.last_name,
                                phone: billing_address?.phone,
                                email: customer?.email,
                                address: billing_address?.address,
                                transactionId: uid,
                                products: products.map((item) => ({
                                    __component: `product.${
                                        COMPONENT_PRODUCT_TYPE[item.type] ||
                                        item.type
                                    }`,
                                    product: item.id,
                                })),
                            },
                        });
                    products.forEach((item) => {
                        strapi.db
                            .query(PRODUCT_API_UID_BY_TYPE[item.type])
                            .update({
                                where: { id: item.id },
                                data: { sold: true },
                            });
                    });
                    strapi.plugins.email.services.email.send({
                        to: customer?.email,
                        from: strapi.plugins.email.config(
                            "providerOptions.username",
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
    }),
);
