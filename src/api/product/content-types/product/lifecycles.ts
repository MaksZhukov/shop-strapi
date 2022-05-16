import slugify from "slugify";

export default {
  beforeCreate(event) {
    const { data } = event.params;
    if (data.vendorCode && data.name) {
      data.slug = slugify(data.name, { lower: true }) + "-" + data.vendorCode;
    }
  },
  beforeUpdate(event) {
    const { data } = event.params;
    if (data.vendorCode && data.name) {
      data.slug = slugify(data.name, { lower: true }) + "-" + data.vendorCode;
    }
  },
};
