import { convertArrayToCSV } from "convert-array-to-csv";
const header = ["Ссылка", "H1"];

const runScripts = async (strapi) => {
    let clientUrl = strapi.config.get("server.clientUrl");
    const results = [];
    const brands = await strapi.db.query("api::brand.brand").findMany({
        populate: { models: true, seoSpareParts: true },
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
        results.push([
            clientUrl + "/spare-parts/" + brand.slug,
            `${brand.seoSpareParts?.h1 || `Запчасти для ${brand.name}`}`,
        ]);
        brand.models.map((model) => {
            results.push([
                clientUrl +
                    "/spare-parts/" +
                    brand.slug +
                    `/model-${model.slug}`,
                `${
                    model.seoSpareParts?.h1 ||
                    `Запчасти для ${brand.name} ${model.name}`
                }`,
            ]);
            kindSpareParts.forEach((kindSparePart) => {
                results.push([
                    clientUrl +
                        "/spare-parts/" +
                        brand.slug +
                        `/model-${model.slug}?kindSparePart=${kindSparePart.name}`,
                    `${`Запчасти ${kindSparePart.name} для ${brand.name} ${model.name}`}`,
                ]);
            });
        });
        kindSpareParts.forEach((kindSparePart) => {
            results.push([
                clientUrl +
                    "/spare-parts/" +
                    brand.slug +
                    `?kindSparePart=${kindSparePart.name}`,
                `${`Запчасти ${kindSparePart.name} для ${brand.name}`}`,
            ]);
        });
    });

    kindSpareParts.forEach((kindSparePart) => {
        results.push([
            clientUrl + "/spare-parts" + `?kindSparePart=${kindSparePart.name}`,
            `Запчасти ${kindSparePart.name}`,
        ]);
    });
    const csv: string = convertArrayToCSV(results, { header });

    await strapi.plugins.email.services.email.send({
        to: "maks_zhukov_97@mail.ru",
        from: strapi.plugins.email.config("providerOptions.username"),
        subject: "Ссылки на все товары",
        attachments: [
            {
                filename: "products.csv",
                content: "\ufeff" + csv,
            },
        ],
    });
};

export default runScripts;
