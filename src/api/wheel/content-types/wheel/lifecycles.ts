import { afterCreateProduct, beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        afterCreateProduct(data);
        lifecycleSitemap();
    },
    afterUpdate: (data) => {
        afterCreateProduct(data);
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
