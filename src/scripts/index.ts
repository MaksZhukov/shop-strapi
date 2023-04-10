const runScripts = async (strapi) => {
    const brands = await strapi.db
        .query("api::brand.brand")
        .findMany({ populate: ["seoCabins", "seoSpareParts", "seoWheels"] });
    brands.forEach(async (brand) => {
        let data: any = {};
        if (!brand.seoCabins?.h1) {
            data.seoCabins = { h1: "Салоны для " + brand.name };
        }
        if (!brand.seoSpareParts?.h1) {
            data.seoSpareParts = { h1: "Запчасти для " + brand.name };
        }
        if (!brand.seoWheels?.h1) {
            data.seoWheels = { h1: "Диски для " + brand.name };
        }
        if (Object.keys(data).length) {
            console.log(data);
            await strapi.entityService.update("api::brand.brand", brand.id, {
                data,
            });
        }
    });

    const models = await strapi.db.query("api::model.model").findMany({
        populate: ["seoCabins", "seoSpareParts", "seoWheels", "brand"],
    });

    models.forEach(async (model) => {
        let data: any = {};
        if (!model.seoCabins?.h1) {
            data.seoCabins = {
                h1: "Салоны для " + model.brand?.name + " " + model.name,
            };
        }
        if (!model.seoSpareParts?.h1) {
            data.seoSpareParts = {
                h1: "Запчасти для " + model.brand?.name + " " + model.name,
            };
        }
        if (!model.seoWheels?.h1) {
            data.seoWheels = {
                h1: "Диски для " + model.brand?.name + " " + model.name,
            };
        }
        if (Object.keys(data).length) {
            console.log(data);
            await strapi.entityService.update("api::model.model", model.id, {
                data,
            });
        }
    });
};

export default runScripts;