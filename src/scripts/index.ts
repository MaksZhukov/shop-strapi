const runScripts = async (strapi) => {
    const brands = (
        await strapi.db
            .query("api::brand.brand")
            .findMany({ populate: { seoSpareParts: true } })
    ).filter((item) => !item.seoSpareParts);

    const models = (
        await strapi.db
            .query("api::model.model")
            .findMany({ populate: { seoSpareParts: true } })
    ).filter((item) => !item.seoSpareParts);
    await strapi.plugins.email.services.email.send({
        to: "maks_zhukov_97@mail.ru",
        from: strapi.plugins.email.config("providerOptions.username"),
        subject: "No seoSpareParts for brands and models",
        text: JSON.stringify(brands) + " " + JSON.stringify(models),
    });
};

export default runScripts;
