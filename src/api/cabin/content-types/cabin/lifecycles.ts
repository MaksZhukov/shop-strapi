import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import {
    addProductUrlToTelegramAllProductsJobUrls,
    removeFavoritesOnSold,
    scheduleUpdateAltTextForProductImages,
} from "../../../../services";

// import { afterDeleteProduct } from "../../../../lifecycles";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::cabin.cabin",
            "api::page-product-cabin.page-product-cabin"
        );
        // addProductUrlToTelegramAllProductsJobUrls(
        //     data.result.id,
        //     "api::cabin.cabin"
        // );
        lifecycleSitemap();
    },
    beforeUpdate: async (data) => {
        if (data.params.data.createdDate) {
            data.params.data.createdAt = data.params.data.createdDate;
        }
    },
    afterUpdate: (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::cabin.cabin",
            "api::page-product-cabin.page-product-cabin"
        );
        removeFavoritesOnSold(data, "product.cabin");
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
