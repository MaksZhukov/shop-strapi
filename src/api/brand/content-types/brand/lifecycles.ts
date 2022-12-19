import slugify from "slugify";

export default {
    beforeCreate(event) {
        const { data } = event.params;
        if (data.name) {
            data.slug = slugify(data.name, { lower: true });
        }
    },
};
