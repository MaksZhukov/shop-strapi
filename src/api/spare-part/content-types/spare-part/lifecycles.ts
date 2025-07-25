import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import {
    addProductUrlToTelegramAllProductsJobUrls,
    removeFavoritesOnSold,
    scheduleUpdateAltTextForProductImages,
} from "../../../../services";
// import { afterDeleteProduct } from "../../../../lifecycles";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: async (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::spare-part.spare-part",
            "api::page-product-spare-part.page-product-spare-part",
        );
        // addProductUrlToTelegramAllProductsJobUrls(
        //     data.result.id,
        //     "api::spare-part.spare-part"
        // );
        lifecycleSitemap();
    },
    beforeUpdate: async (data) => {
        if (data.params.data.createdDate) {
            data.params.data.createdAt = data.params.data.createdDate;
        }
    },
    afterUpdate: async (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::spare-part.spare-part",
            "api::page-product-spare-part.page-product-spare-part",
        );
        removeFavoritesOnSold(data, "product.spare-part");
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
