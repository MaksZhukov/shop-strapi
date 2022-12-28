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
        strapi.entityService.update(
            "api::tire-brand.tire-brand",
            event.result.id,
            {
                data: {
                    productBrandText: generateDefaultBrandTextComponent(
                        event.result,
                        "Шины",
                        "tires"
                    ),
                },
            }
        );
        lifecycleSitemap();
    },
    afterUpdate: lifecycleSitemap,
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
