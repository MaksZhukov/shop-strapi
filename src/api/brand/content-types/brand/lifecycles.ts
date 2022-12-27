import slugify from "slugify";
import { lifecycleSitemap } from "../../../../lifecycles";

export default {
    beforeCreate(event) {
        const { data } = event.params;
        if (data.name) {
            data.slug = slugify(data.name, { lower: true });
        }
    },
    afterCreate: lifecycleSitemap,
    afterUpdate: lifecycleSitemap,
    afterDelete: lifecycleSitemap,
};
