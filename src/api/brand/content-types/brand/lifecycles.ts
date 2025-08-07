import slugify from "slugify";
import { lifecycleSitemap } from "../../../../lifecycles";
import {
    generateDefaultBrandSnippets,
    generateDefaultBrandTextComponent,
} from "../../../../services";

export default {
    beforeCreate(event) {
        const { data } = event.params;
        if (data.id && !data.code) {
            data.code = data.id;
        }
        if (data.name) {
            data.slug = slugify(data.name, { lower: true, strict: true });
        }
    },
    afterCreate: (event) => {
        strapi.entityService.update("api::brand.brand", event.result.id, {
            data: {
                seoSpareParts: generateDefaultBrandSnippets(
                    "запчасти",
                    event.result.name
                ),
                seoCabins: generateDefaultBrandSnippets(
                    "салоны",
                    event.result.name
                ),
                seoWheels: generateDefaultBrandSnippets(
                    "диски",
                    event.result.name
                ),
                productBrandTexts: {
                    sparePartBrandText: generateDefaultBrandTextComponent(
                        event.result,
                        "Запчасти",
                        "spare-parts"
                    ),
                    cabinTextBrand: generateDefaultBrandTextComponent(
                        event.result,
                        "Салоны",
                        "cabins"
                    ),
                    wheelTextBrand: generateDefaultBrandTextComponent(
                        event.result,
                        "Диски",
                        "wheels"
                    ),
                },
            } as any,
        });
        lifecycleSitemap();
    },
    afterUpdate: lifecycleSitemap,
    afterDelete: lifecycleSitemap,
};
