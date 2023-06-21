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
            "api::tire.tire",
            "api::page-product-tire.page-product-tire"
        );
        scheduleUpdateImageMetadataAfterCreate(data.result, "api::tire.tire");
        addProductUrlToTelegramAllProductsJobUrls(
            data.result.id,
            "api::tire.tire"
        );
        lifecycleSitemap();
    },
    beforeUpdate: async (data) => {
        await scheduleUpdateImageMetadataBeforeUpdate(data, "api::tire.tire");
    },
    afterUpdate: (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::tire.tire",
            "api::page-product-tire.page-product-tire"
        );
        removeFavoritesOnSold(data, "product.tire");
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
