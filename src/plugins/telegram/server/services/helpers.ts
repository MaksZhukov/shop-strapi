import { productTypeUrlSlug } from "./config";

const runProductsQueriesWithLimit = async (queries, limit, callback) => {
    let index = 0;
    let page = 0;
    let products: any[] = [];
    while (index < queries.length) {
        let query = queries[index];
        const results = await query.findMany({
            populate: ["brand"],
            limit: limit - products.length,
            offset: page * limit,
        });
        products.push(...results);
        if (products.length === limit || index === queries.length - 1) {
            await callback(products);
            page++;
            products = [];
        }
        if (results.length < limit) {
            index++;
            page = 0;
        }
    }
};

export const runProductsUrlsQueriesWithLimit = async (strapi, callback) => {
    let clientUrl = strapi.config.get("server.clientUrl");

    let queries = [
        strapi.db.query("api::spare-part.spare-part"),
        strapi.db.query("api::cabin.cabin"),
        strapi.db.query("api::wheel.wheel"),
        strapi.db.query("api::tire.tire"),
    ];

    await runProductsQueriesWithLimit(queries, 500, async (products: any[]) => {
        await callback(
            products.map(
                (item) =>
                    clientUrl +
                    `/${productTypeUrlSlug[item.type]}/${item.brand?.slug}/` +
                    item.slug
            )
        );
    });
};

export const createJobUrls = async (jobID, urls) => {
    const {
        count,
        //@ts-expect-error error
        ids: [lastId],
    } = await strapi.db.query("plugin::telegram.urls").createMany({
        data: urls.map((item) => ({ url: item })),
    });

    const ids = new Array(count)
        .fill(null)
        .map((item, index) => lastId - index);

    await Promise.all(
        ids.map((id) =>
            strapi.db.query("plugin::telegram.urls").updateRelations(id, {
                job: jobID,
            })
        )
    );
};

export const addTelegramInterval = (bot, chatId, jobId, ms, jobsIntervalIds) =>
    setInterval(async () => {
        let chatId = strapi.config.get("server.telegramChatId");
        const urlEntity = await strapi.db
            .query("plugin::telegram.urls")
            .findOne({
                where: { job: jobId },
                orderBy: { createdAt: "desc" },
            });
        if (urlEntity) {
            bot.sendMessage(chatId, urlEntity.url);
            console.log(ms, urlEntity);
            strapi.db
                .query("plugin::telegram.urls")
                .delete({ where: { id: urlEntity.id } });
        } else {
            clearInterval(jobsIntervalIds[jobId]);
            strapi.db
                .query("plugin::telegram.jobs")
                .delete({ where: { id: jobId } });
        }
    }, 30000);
