import { template } from "./config";

const DAY_MS = 24 * 60 * 60 * 1000;

export const hasDelayOfSendingYMLEmail = async (strapi) => {
    const { dateYMLSentToEmail } = await strapi
        .service("plugin::internal.data")
        .find();
    return (
        new Date(dateYMLSentToEmail).getTime() < new Date().getTime() - DAY_MS
    );
};

export const sendYMLToEmail = async ({ strapi }) => {
    const serverUrl = strapi.config.get("server.serverUrl");
    let data = template([], [], serverUrl);
    await strapi.plugins.email.services.email.send({
        to: [
            strapi.config.get("server.emailForNewProducts"),
            "maks_zhukov_97@mail.ru",
        ],
        from: strapi.plugins.email.config("providerOptions.username"),
        subject: "YML Файл",
        attachments: [
            {
                filename: "yml.xml",
                content: "\ufeff" + data,
            },
        ],
    });

    await strapi.service("plugin::internal.data").createOrUpdate({
        data: {
            dateYMLSentToEmail: new Date().getTime(),
        },
    });
};
