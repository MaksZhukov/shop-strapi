import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
// import { afterDeleteProduct } from "../../../../lifecycles";

// test

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: lifecycleSitemap,
    afterUpdate: lifecycleSitemap,
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
