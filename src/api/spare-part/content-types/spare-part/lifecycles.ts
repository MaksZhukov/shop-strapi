import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import { updateAltTextForProductImages } from "../../../../services";
// import { afterDeleteProduct } from "../../../../lifecycles";


export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        updateAltTextForProductImages(data.result);
        lifecycleSitemap();
    },
    afterUpdate: (data) => {
        updateAltTextForProductImages(data.result);
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
