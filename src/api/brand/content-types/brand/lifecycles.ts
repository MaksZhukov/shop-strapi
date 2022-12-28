import slugify from "slugify";
import { lifecycleSitemap } from "../../../../lifecycles";
import { generateDefaultBrandTextComponent } from "../../../../services";

export default {
    beforeCreate(event) {
        const { data } = event.params;
        if (data.name) {
            data.slug = slugify(data.name, { lower: true });
        }
    },
    afterCreate: (event) => {
        strapi.entityService.update("api::brand.brand", event.result.id, {
            data: {
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
            },
        });
        lifecycleSitemap();
    },
    afterUpdate: lifecycleSitemap,
    afterDelete: lifecycleSitemap,
};
