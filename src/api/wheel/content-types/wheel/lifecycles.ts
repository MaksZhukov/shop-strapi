import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import { removeFavoritesOnSold, scheduleUpdateAltTextForProductImages } from "../../../../services";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        scheduleUpdateAltTextForProductImages(data.result, "api::wheel.wheel");
        lifecycleSitemap();
    },
    afterUpdate: (data) => {
        scheduleUpdateAltTextForProductImages(data.result, "api::wheel.wheel");
        removeFavoritesOnSold(data, "product.wheel");
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
