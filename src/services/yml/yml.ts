import fs from "fs";
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
        {
            queryUID: "api::spare-part.spare-part",
            populate: ["brand", "images"],
        },
        { queryUID: "api::cabin.cabin", populate: ["brand", "images"] },
        { queryUID: "api::wheel.wheel", populate: ["brand", "images"] },
        { queryUID: "api::tire.tire", populate: ["brand", "images"] },
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
    const writeableStream = fs.createWriteStream(
        process.cwd() + "/public/uploads/yml.xml"
    );
    for (let i = 0; i < data.length; i += 10000) {
        const chunk = data.slice(i, i + 10000);
        writeableStream.write(chunk);
    }
    writeableStream.end();

    await strapi.plugins.email.services.email.send({
        to: [
            strapi.config.get("server.emailForNewProducts"),
            "maks_zhukov_97@mail.ru",
        ],
        from: strapi.plugins.email.config("providerOptions.username"),
        subject: "YML Файлы VK",
        attachments: attachments,
    });

    await strapi.service("plugin::internal.data").createOrUpdate({
        data: {
            dateYMLSentToEmail: new Date().getTime(),
        },
    });
};
