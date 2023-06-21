import { runProductsQueriesWithLimit } from "..";
import { template, templateOffers } from "./config";

const LIMIT = 10000;

const DAY_MS = 24 * 60 * 60 * 1000;

export const hasDelayOfSendingYMLEmail = async (strapi) => {
    const { dateYMLSentToEmail } = await strapi
        .service("plugin::internal.data")
        .find();
    return (
        new Date(dateYMLSentToEmail).getTime() < new Date().getTime() - DAY_MS
    );
};

export const sendYMLsToEmail = async ({ strapi }) => {
    let queries = [
        strapi.db.query("api::spare-part.spare-part"),
        strapi.db.query("api::cabin.cabin"),
        strapi.db.query("api::wheel.wheel"),
        strapi.db.query("api::tire.tire"),
    ];

    const attachments = [];
    let ymlAllOffers = "";

    await runProductsQueriesWithLimit(queries, LIMIT, (products: any[]) => {
        let ymlOffers = templateOffers(products);
        const data = template(ymlOffers);
        attachments.push({
            filename: `yml-vk-${attachments.length + 1}.xml`,
            content: "\ufeff" + data,
        });
        ymlAllOffers += ymlOffers;
    });

    let data = template(ymlAllOffers);
    attachments.push({
        filename: `yml-yandex.xml`,
        content: "\ufeff" + data,
    });
    await strapi.plugins.email.services.email.send({
        to: [
            strapi.config.get("server.emailForNewProducts"),
            "maks_zhukov_97@mail.ru",
        ],
        from: strapi.plugins.email.config("providerOptions.username"),
        subject: "YML Файлы VK + Yandex",
        attachments: attachments,
    });

    await strapi.service("plugin::internal.data").createOrUpdate({
        data: {
            dateYMLSentToEmail: new Date().getTime(),
        },
    });
};
