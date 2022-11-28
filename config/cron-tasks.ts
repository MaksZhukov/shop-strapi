const getProductUrls = async (uid, date, clientUrl, productType, title) => {
    let urls = (
        await strapi.db.query(uid).findMany({
            select: ["slug"],
            where: {
                createdAt: { $gte: date.setDate(date.getDate() - 1) },
            },
        })
    ).map((item) => clientUrl + `/products/${productType}/` + item.slug);
    return urls.reduce((prev, curr) => prev + curr + "\n", `${title}\n`);
};

export default {
    "0 9 * * *": async ({ strapi }) => {
        let clientUrl = strapi.config.get("api.clientUrl");
        const date = new Date();
        const results = await Promise.all([
            getProductUrls(
                "api::spare-part.spare-part",
                date,
                clientUrl,
                "sparePart",
                "Запчасти"
            ),
            getProductUrls("api::tire.tire", date, clientUrl, "tire", "Шины"),
            getProductUrls(
                "api::wheel.wheel",
                date,
                clientUrl,
                "wheel",
                "Диски"
            ),
        ]);
        let str = results.reduce((prev, curr) => prev + curr, "");
        await strapi.plugins.email.services.email.send({
            to: "ser8728@yandex.ru",
            from: "driblingavto@mail.ru",
            subject: "Ссылки на новые товары",
            attachments: [
                {
                    filename: "products.txt",
                    content: str,
                },
            ],
        });
    },
};
