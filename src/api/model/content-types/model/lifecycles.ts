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
    beforeUpdate(event) {
        const { data } = event.params;
        if (data.name) {
            data.slug = slugify(data.name, { lower: true });
        }
    },
    afterCreate: (event) => {
        lifecycleSitemap();
    },
    afterUpdate: lifecycleSitemap,
    afterDelete: lifecycleSitemap,
};
