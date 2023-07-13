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

// import { afterDeleteProduct } from "../../../../lifecycles";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::cabin.cabin",
            "api::page-product-cabin.page-product-cabin"
        );
        scheduleUpdateImageMetadataAfterCreateProduct(
            data.result,
            "api::cabin.cabin"
        );
        addProductUrlToTelegramAllProductsJobUrls(
            data.result.id,
            "api::cabin.cabin"
        );
        lifecycleSitemap();
    },
    beforeUpdate: async (data) => {
        await scheduleUpdateImageMetadataBeforeUpdateProduct(
            data,
            "api::cabin.cabin"
        );
    },
    afterUpdate: (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::cabin.cabin",
            "api::page-product-cabin.page-product-cabin"
        );
        removeFavoritesOnSold(data, "product.cabin");
        if (data.params.data.createdDate) {
            data.params.data.createdAt = data.params.data.createdDate;
        }
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
