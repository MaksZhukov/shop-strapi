import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import {
    addProductUrlToTelegramAllProductsJobUrls,
    removeFavoritesOnSold,
    scheduleUpdateAltTextForProductImages,
} from "../../../../services";
import { scheduleUpdateImageMetadata } from "../../../../services/imageMetadata";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::tire.tire",
            "api::page-product-tire.page-product-tire"
        );
        scheduleUpdateImageMetadata(data.result, "api::tire.tire");
        addProductUrlToTelegramAllProductsJobUrls(
            data.result.id,
            "api::tire.tire"
        );
        lifecycleSitemap();
    },
    afterUpdate: (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::tire.tire",
            "api::page-product-tire.page-product-tire"
        );
        removeFavoritesOnSold(data, "product.tire");
        scheduleUpdateImageMetadata(data.result, "api::tire.tire");
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
