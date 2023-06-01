import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import {
    removeFavoritesOnSold,
    scheduleUpdateAltTextForProductImages,
} from "../../../../services";

// import { afterDeleteProduct } from "../../../../lifecycles";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        scheduleUpdateAltTextForProductImages(data.result, "api::cabin.cabin");
        lifecycleSitemap();
    },
    afterUpdate: (data) => {
        scheduleUpdateAltTextForProductImages(data.result, "api::cabin.cabin");
        removeFavoritesOnSold(data, "product.cabin");
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
