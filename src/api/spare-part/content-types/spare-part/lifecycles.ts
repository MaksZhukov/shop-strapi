import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import {
    removeFavoritesOnSold,
    scheduleUpdateAltTextForProductImages,
} from "../../../../services";
// import { afterDeleteProduct } from "../../../../lifecycles";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: async (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::spare-part.spare-part"
        );
        lifecycleSitemap();
    },
    afterUpdate: async (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::spare-part.spare-part"
        );
        removeFavoritesOnSold(data, "product.spare-part");
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
