import slugify from "slugify";

export default {
    beforeCreate(event) {
        const { data } = event.params;
        if (data.id && data.name) {
            data.slug = slugify(data.name, { lower: true }) + "-" + data.id;
        }
    },
    beforeUpdate(event) {
        const { data } = event.params;
        if (data.id && data.name) {
            data.slug = slugify(data.name, { lower: true }) + "-" + data.id;
        }
    },
    async beforeDelete(event) {
        const { id } = event.params.where;
        await Promise.all([
            strapi.db
                .query("api::favorite.favorite")
                .delete({ where: { sparePart: id } }),
            strapi.db
                .query("api::shopping-cart.shopping-cart")
                .delete({ where: { sparePart: id } }),
        ]);
    },
};
