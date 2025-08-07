import slugify from "slugify";

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
    beforeUpdate(event) {
        const { data } = event.params;
        if (data.name) {
            data.slug = slugify(data.name, { lower: true, strict: true });
        }
    },
};
