async function up(knex) {
    const tireBrands = await strapi.db
        .query("api::tire-brand.tire-brand")
        .findMany();
    let clientUrl = strapi.config.get("server.clientUrl");

    tireBrands.forEach(async (item) => {
        strapi.entityService.update("api::tire-brand.tire-brand", item.id, {
            data: {
                ...item,
                productBrandText: {
                    content: `<p>
                        Еще больше качественных товаров в категории сайта <a href="${clientUrl}/tires/${item.slug}"><span>Шины для ${item.name}</span></a>
                    </p>`,
                },
            },
        });
    });
}

module.exports = { up };
