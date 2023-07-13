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
            "api::tire.tire",
            "api::page-product-tire.page-product-tire"
        );
        scheduleUpdateImageMetadataAfterCreateProduct(
            data.result,
            "api::tire.tire"
        );
        addProductUrlToTelegramAllProductsJobUrls(
            data.result.id,
            "api::tire.tire"
        );
        lifecycleSitemap();
    },
    beforeUpdate: async (data) => {
        await scheduleUpdateImageMetadataBeforeUpdateProduct(
            data,
            "api::tire.tire"
        );
        if (data.params.data.createdDate) {
            data.params.data.createdAt = data.params.data.createdDate;
        }
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
