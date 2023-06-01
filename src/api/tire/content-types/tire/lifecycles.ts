import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import { removeFavoritesOnSold, scheduleUpdateAltTextForProductImages } from "../../../../services";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        scheduleUpdateAltTextForProductImages(data.result, "api:tire.tire");
        lifecycleSitemap();
    },
    afterUpdate: (data) => {
        scheduleUpdateAltTextForProductImages(data.result, "api::tire.tire");
        removeFavoritesOnSold(data, "product.tire");
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
