import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import {
    addProductUrlToTelegramAllProductsJobUrls,
    removeFavoritesOnSold,
    scheduleUpdateAltTextForProductImages,
} from "../../../../services";
import {
    scheduleUpdateImageMetadataAfterCreate,
    scheduleUpdateImageMetadataBeforeUpdate,
} from "../../../../services/imageMetadata";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::wheel.wheel",
            "api::page-product-wheel.page-product-wheel"
        );
        scheduleUpdateImageMetadataAfterCreate(data.result, "api::wheel.wheel");
        addProductUrlToTelegramAllProductsJobUrls(
            data.result.id,
            "api::wheel.wheel"
        );
        lifecycleSitemap();
    },
    beforeUpdate: async (data) => {
        await scheduleUpdateImageMetadataBeforeUpdate(data, "api::wheel.wheel");
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
