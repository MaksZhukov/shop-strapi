import {
    beforeCreateProduct,
    lifecycleSitemap,
} from "../../../../lifecycles";
import { updateAltTextForProductImages } from "../../../../services";

// import { afterDeleteProduct } from "../../../../lifecycles";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        lifecycleSitemap();
    },
    afterUpdate: (data) => {
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
