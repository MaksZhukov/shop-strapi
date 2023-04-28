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
    const brands = await strapi.db.query("api::brand.brand").findMany({
        populate: { seoSpareParts: true, seoCabins: true, seoWheels: true },
    });
    brands.forEach(async (item) => {
        let data: any = {};
        data.seoSpareParts = {
            title:
                item.seoSpareParts?.title ||
                `Купить запчасти для ${item.name}. Доставка. Цены не кусаются`,
            description:
                item.seoSpareParts?.description ||
                `Предлагаем купить запчасти для ${item.name} в нашем магазине. Диски, салоны, запчасти. На нашей разборке найдется все для вашего авто`,
            keywords:
                item.seoSpareParts?.keywords || `Запчасти для ${item.name}`,
            h1: item.seoSpareParts?.h1 || `Запчасти для ${item.name}`,
        };

        data.seoWheels = {
            title:
                item.seoWheels?.title ||
                `Купить диски для ${item.name}. Доставка. Цены не кусаются`,
            description:
                item.seoWheels?.description ||
                `Предлагаем купить диски для ${item.name} в нашем магазине. Диски, салоны, запчасти. На нашей разборке найдется все для вашего авто`,
            keywords: item.seoWheels?.keywords || `Диски для ${item.name}`,
            h1: item.seoWheels?.h1 || `Диски для ${item.name}`,
        };

        data.seoCabins = {
            title:
                item.seoCabins?.title ||
                `Купить салоны для ${item.name}. Доставка. Цены не кусаются`,
            description:
                item.seoCabins?.description ||
                `Предлагаем купить салоны для ${item.name} в нашем магазине. Диски, салоны, запчасти. На нашей разборке найдется все для вашего авто`,
            keywords: item.seoCabins?.keywords || `Салоны для ${item.name}`,
            h1: item.seoCabins?.h1 || `Салоны для ${item.name}`,
        };
        strapi.entityService.update("api::brand.brand", item.id, {
            data,
        });
    });
};

export default runScripts;
