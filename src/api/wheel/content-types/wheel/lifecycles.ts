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
            "api::wheel.wheel",
            "api::page-product-wheel.page-product-wheel"
        );
        scheduleUpdateImageMetadata(data.result, "api::wheel.wheel");
        addProductUrlToTelegramAllProductsJobUrls(
            data.result.id,
            "api::wheel.wheel"
        );
        lifecycleSitemap();
    },
    afterUpdate: (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::wheel.wheel",
            "api::page-product-wheel.page-product-wheel"
        );
        removeFavoritesOnSold(data, "product.wheel");
        scheduleUpdateImageMetadata(data.result, "api::wheel.wheel");
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
