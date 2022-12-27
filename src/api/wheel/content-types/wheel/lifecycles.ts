import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: lifecycleSitemap,
    afterUpdate: lifecycleSitemap,
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
