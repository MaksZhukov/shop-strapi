const runScripts = async (strapi) => {
    let clientUrl = strapi.config.get("server.clientUrl");
    const results = [];
    const brands = await strapi.db.query("api::brand.brand").findMany({
        populate: { models: true },
        where: {
            spareParts: {
                id: {
                    $notNull: true,
                },
            },
        },
    });
    const kindSpareParts = await strapi.db
        .query("api::kind-spare-part.kind-spare-part")
        .findMany();
    brands.forEach((brand) => {
        results.push(clientUrl + "/spare-parts/" + brand.slug);
        brand.models.map((model) => {
            results.push(
                clientUrl +
                    "/spare-parts/" +
                    brand.slug +
                    `/model-${model.slug}`
            );
            kindSpareParts.forEach((kindSparePart) => {
                results.push(
                    clientUrl +
                        "/spare-parts/" +
                        brand.slug +
                        `/model-${model.slug}?kindSparePart=${kindSparePart.name}`
                );
            });
        });
        kindSpareParts.forEach((kindSparePart) => {
            results.push(
                clientUrl +
                    "/spare-parts/" +
                    brand.slug +
                    `?kindSparePart=${kindSparePart.name}`
            );
        });
    });

    kindSpareParts.forEach((kindSparePart) => {
        results.push(
            clientUrl + "/spare-parts" + `?kindSparePart=${kindSparePart.name}`
        );
    });

    let str = results.reduce((prev, curr) => prev + curr + "\n", "");
    await strapi.plugins.email.services.email.send({
        to: "maks_zhukov_97@mail.ru",
        from: strapi.plugins.email.config("providerOptions.username"),
        subject: "Ссылки на все товары",
        attachments: [
            {
                filename: "products.txt",
                content: str,
            },
        ],
    });
};

export default runScripts;
