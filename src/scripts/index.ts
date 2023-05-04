const runScripts = async (strapi) => {
    const tireBrands = await strapi.db
        .query("api::tire-brand.tire-brand")
        .findMany({ populate: { seo: true } });
    tireBrands.forEach((item) => {
        strapi.entityService.update("api::tire-brand.tire-brand", item.id, {
            data: {
                seo: {
                    title: `Купить шины ${item.name}. Доставка. Цены не кусаются`,
                    description: `Предлагаем купить шины ${item.name} в нашем магазине. На нашей разборке найдется все для вашего авто`,
                    keywords: "Шины " + item.name,
                    h1: "Шины " + item.name,
                },
            },
        });
    });
};

export default runScripts;
