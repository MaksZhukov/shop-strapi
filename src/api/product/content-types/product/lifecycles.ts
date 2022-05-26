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
};
