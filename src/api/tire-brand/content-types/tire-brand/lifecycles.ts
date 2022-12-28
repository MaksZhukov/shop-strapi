import slugify from "slugify";
import { lifecycleSitemap } from "../../../../lifecycles";
import { generateDefaultBrandText } from "../../../../services";

export default {
    beforeCreate(event) {
        const { data } = event.params;
        if (data.name) {
            data.slug = slugify(data.name, { lower: true });
        }
        data.productBrandText = {
            content: generateDefaultBrandText(data, "tires"),
        };
    },
    afterCreate: lifecycleSitemap,
    afterUpdate: lifecycleSitemap,
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
