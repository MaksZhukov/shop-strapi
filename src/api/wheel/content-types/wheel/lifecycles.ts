import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import {
    addProductUrlToTelegramAllProductsJobUrls,
    removeFavoritesOnSold,
    scheduleUpdateAltTextForProductImages,
} from "../../../../services";
import {
    scheduleUpdateImageMetadataAfterCreateProduct,
    scheduleUpdateImageMetadataBeforeUpdateProduct,
} from "../../../../services/imageMetadata";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::wheel.wheel",
            "api::page-product-wheel.page-product-wheel"
        );
        scheduleUpdateImageMetadataAfterCreateProduct(
            data.result,
            "api::wheel.wheel"
        );
        addProductUrlToTelegramAllProductsJobUrls(
            data.result.id,
            "api::wheel.wheel"
        );
        lifecycleSitemap();
    },
    beforeUpdate: async (data) => {
        await scheduleUpdateImageMetadataBeforeUpdateProduct(
            data,
            "api::wheel.wheel"
        );
        if (data.params.data.createdDate) {
            data.params.data.createdAt = data.params.data.createdDate;
        }
    },
    afterUpdate: (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::wheel.wheel",
            "api::page-product-wheel.page-product-wheel"
        );
        removeFavoritesOnSold(data, "product.wheel");
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
