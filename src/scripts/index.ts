import { generateDefaultBrandTextComponent } from "../services";

const runScripts = async (strapi) => {
    const brands = await strapi.db
        .query("api::brand.brand")
        .findMany({ populate: ["seoCabins", "seoSpareParts", "seoWheels"] });
    brands.forEach(async (brand) => {
        await strapi.entityService.update("api::brand.brand", brand.id, {
            data: {
                productBrandTexts: {
                    sparePartBrandText: generateDefaultBrandTextComponent(
                        brand,
                        "Запчасти",
                        "spare-parts"
                    ),
                    cabinTextBrand: generateDefaultBrandTextComponent(
                        brand,
                        "Салоны",
                        "cabins"
                    ),
                    wheelTextBrand: generateDefaultBrandTextComponent(
                        brand,
                        "Диски",
                        "wheels"
                    ),
                },
            },
        });
    });
};

export default runScripts;
