import slugify from "slugify";
import { lifecycleSitemap } from "../../../../lifecycles";
import { generateDefaultBrandText } from "../../../../services";

export default {
    beforeCreate(event) {
        const { data } = event.params;
        if (data.name) {
            data.slug = slugify(data.name, { lower: true });
        }
        data.productBrandProductTexts = {
            sparePartBrandText: {
                content: generateDefaultBrandText(data, "spare-parts"),
            },
            cabinTextBrand: {
                content: generateDefaultBrandText(data, "cabins"),
            },
            wheelTextBrand: {
                content: generateDefaultBrandText(data, "wheels"),
            },
        };
    },
    afterCreate: lifecycleSitemap,
    afterUpdate: lifecycleSitemap,
    afterDelete: lifecycleSitemap,
};
