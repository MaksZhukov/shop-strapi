const header = ["Ссылка", "H1"];

// const runScripts = async (strapi) => {
//     let clientUrl = strapi.config.get("server.clientUrl");
//     const results = [];
//     const brands = await strapi.db.query("api::brand.brand").findMany({
//         populate: { models: true, seoSpareParts: true },
//         where: {
//             spareParts: {
//                 id: {
//                     $notNull: true,
//                 },
//             },
//         },
//     });
//     const kindSpareParts = await strapi.db
//         .query("api::kind-spare-part.kind-spare-part")
//         .findMany();
//     brands.forEach((brand) => {
//         results.push([
//             clientUrl + "/spare-parts/" + brand.slug,
//             `${brand.seoSpareParts?.h1 || `Запчасти для ${brand.name}`}`,
//         ]);
//         brand.models.map((model) => {
//             results.push([
//                 clientUrl +
//                     "/spare-parts/" +
//                     brand.slug +
//                     `/model-${model.slug}`,
//                 `${
//                     model.seoSpareParts?.h1 ||
//                     `Запчасти для ${brand.name} ${model.name}`
//                 }`,
//             ]);
//             kindSpareParts.forEach((kindSparePart) => {
//                 results.push([
//                     clientUrl +
//                         "/spare-parts/" +
//                         brand.slug +
//                         `/model-${model.slug}?kindSparePart=${kindSparePart.name}`,
//                     `${`Запчасти ${kindSparePart.name} для ${brand.name} ${model.name}`}`,
//                 ]);
//             });
//         });
//         kindSpareParts.forEach((kindSparePart) => {
//             results.push([
//                 clientUrl +
//                     "/spare-parts/" +
//                     brand.slug +
//                     `?kindSparePart=${kindSparePart.name}`,
//                 `${`Запчасти ${kindSparePart.name} для ${brand.name}`}`,
//             ]);
//         });
//     });

//     kindSpareParts.forEach((kindSparePart) => {
//         results.push([
//             clientUrl + "/spare-parts" + `?kindSparePart=${kindSparePart.name}`,
//             `Запчасти ${kindSparePart.name}`,
//         ]);
//     });
//     const csv: string = convertArrayToCSV(results, { header });

//     await strapi.plugins.email.services.email.send({
//         to: "maks_zhukov_97@mail.ru",
//         from: strapi.plugins.email.config("providerOptions.username"),
//         subject: "Ссылки на все товары",
//         attachments: [
//             {
//                 filename: "products.csv",
//                 content: "\ufeff" + csv,
//             },
//         ],
//     });
// };

const runScripts = async (strapi) => {
    const models = await strapi.db.query("api::model.model").findMany({
        populate: {
            seoSpareParts: true,
            seoCabins: true,
            seoWheels: true,
            brand: true,
        },
    });
    models.forEach(async (item) => {
        let data: any = {};
        data.seoSpareParts = {
            title:
                item.seoSpareParts?.title ||
                `Запчасти для ${item.brand.name} ${item.name} б/у купить с доставкой по Беларуси`,
            description:
                item.seoSpareParts?.description ||
                `Ищете как можно запчасти для ${item.brand.name} ${item.name} б/у купить выгодно? У нас топ цены, доставка, покупка онлайн на сайте. Огромный выбор`,
            keywords:
                item.seoSpareParts?.keywords ||
                `Запчасти для ${item.brand.name} ${item.name}`,
            h1:
                item.seoSpareParts?.h1 ||
                `Запчасти для ${item.brand.name} ${item.name}`,
        };

        data.seoWheels = {
            title:
                item.seoWheels?.title ||
                `Диски для ${item.brand.name} ${item.name} б/у купить с доставкой по Беларуси`,
            description:
                item.seoWheels?.description ||
                `Ищете как можно диски для ${item.brand.name} ${item.name} б/у купить выгодно? У нас топ цены, доставка, покупка онлайн на сайте. Огромный выбор`,
            keywords:
                item.seoWheels?.keywords ||
                `Диски для ${item.brand.name} ${item.name}`,
            h1:
                item.seoWheels?.h1 ||
                `Диски для ${item.brand.name} ${item.name}`,
        };

        data.seoCabins = {
            title:
                item.seoCabins?.title ||
                `Салоны для ${item.brand.name} ${item.name} б/у купить с доставкой по Беларуси`,
            description:
                item.seoCabins?.description ||
                `Ищете как можно салоны для ${item.brand.name} ${item.name} б/у купить выгодно? У нас топ цены, доставка, покупка онлайн на сайте. Огромный выбор`,
            keywords:
                item.seoCabins?.keywords ||
                `Салоны для ${item.brand.name} ${item.name}`,
            h1:
                item.seoCabins?.h1 ||
                `Салоны для ${item.brand.name} ${item.name}`,
        };
        strapi.entityService.update("api::model.model", item.id, {
            data,
        });
    });
};

export default runScripts;
