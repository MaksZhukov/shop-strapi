async function up(knex) {
    const brands = await strapi.db.query("api::brand.brand").findMany();
    const tireBrands = await strapi.db
        .query("api::tire-brand.tire-brand")
        .findMany();
    let clientUrl = strapi.config.get("server.clientUrl");

    brands.forEach(async (item) => {
        strapi.entityService.update("api::brand.brand", item.id, {
            data: {
                ...item,
                productBrandTexts: {
                    sparePartBrandText: {
                        content: `<p>
                    Еще больше качественных товаров в категории сайта <a href="${clientUrl}/spare-parts/${
                            item.slug
                        }"><span style="font-family:&quot;Calibri&quot;,sans-serif;">Запчасти для ${item.name.toLowerCase()}</span></a>
                </p>`,
                    },
                    cabinTextBrand: {
                        content: `<p>
                    Еще больше качественных товаров в категории сайта <a href="${clientUrl}/cabins/${
                            item.slug
                        }"><span style="font-family:&quot;Calibri&quot;,sans-serif;">Салоны для ${item.name.toLowerCase()}</span></a>
                </p>`,
                    },
                    wheelTextBrand: {
                        content: `<p>
                    Еще больше качественных товаров в категории сайта <a href="${clientUrl}/wheels/${
                            item.slug
                        }"><span style="font-family:&quot;Calibri&quot;,sans-serif;">Диски для ${item.name.toLowerCase()}</span></a>
                </p>`,
                    },
                },
            },
        });
    });

    tireBrands.forEach(async (item) => {
        strapi.entityService.update("api::tire-brand.tire-brand", item.id, {
            data: {
                ...item,
                productBrandText: {
                    content: `<p>
                        Еще больше качественных товаров в категории сайта <a href="${clientUrl}/tires/${
                        item.slug
                    }"><span style="font-family:&quot;Calibri&quot;,sans-serif;">Диски для ${item.name.toLowerCase()}</span></a>
                    </p>`,
                },
            },
        });
    });
}

module.exports = { up };
