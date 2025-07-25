import slugify from "slugify";
import { lifecycleSitemap } from "../../../../lifecycles";
import { generateDefaultModelSnippets } from "../../../../services";

export default {
    beforeCreate(event) {
        const { data } = event.params;
        if (data.name) {
            data.slug = slugify(data.name, { lower: true, strict: true });
        }
    },
    beforeUpdate(event) {
        const { data } = event.params;
        if (data.name) {
            data.slug = slugify(data.name, { lower: true, strict: true });
        }
    },
    afterCreate: async (event) => {
        const brand = await strapi.db
            .query("api::brand.brand")
            .findOne({ where: { models: event.result.id } });

        strapi.entityService.update("api::model.model", event.result.id, {
            data: {
                seoSpareParts: generateDefaultModelSnippets(
                    "запчасти",
                    brand.name,
                    event.result.name
                ),
                seoCabins: generateDefaultModelSnippets(
                    "салоны",
                    brand.name,
                    event.result.name
                ),
                seoWheels: generateDefaultModelSnippets(
                    "диски",
                    "",
                    event.result.name
                ),
            } as any,
        });
        lifecycleSitemap();
    },
    afterUpdate: lifecycleSitemap,
    afterDelete: lifecycleSitemap,
};
