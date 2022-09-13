import slugify from "slugify";

export default {
    beforeCreate(event) {
        const { data } = event.params;
        if (data.id) {
            let name =
                data.brand ??
                "" + " " + data.model ??
                "" + " " + data.manufactureDate
                    ? `${new Date(data.manufactureDate).getFullYear()}`
                    : "";
            data.slug = slugify(name, { lower: true }) + "-" + data.id;
        }
    },
    beforeUpdate(event) {
        const { data } = event.params;
        if (data.id) {
            let name =
                data.brand ??
                "" + " " + data.model ??
                "" + " " + data.manufactureDate
                    ? `${new Date(data.manufactureDate).getFullYear()}`
                    : "";
            data.slug = slugify(name, { lower: true }) + "-" + data.id;
        }
    },
};
