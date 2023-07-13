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
    afterCreate: async (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::spare-part.spare-part",
            "api::page-product-spare-part.page-product-spare-part"
        );
        scheduleUpdateImageMetadataAfterCreateProduct(
            data.result,
            "api::spare-part.spare-part"
        );
        addProductUrlToTelegramAllProductsJobUrls(
            data.result.id,
            "api::spare-part.spare-part"
        );
        lifecycleSitemap();
    },
    beforeUpdate: async (data) => {
        await scheduleUpdateImageMetadataBeforeUpdateProduct(
            data,
            "api::spare-part.spare-part"
        );
        if (data.params.data.createdDate) {
            data.params.data.createdAt = data.params.data.createdDate;
        }
    },
    afterUpdate: async (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::spare-part.spare-part",
            "api::page-product-spare-part.page-product-spare-part"
        );
        removeFavoritesOnSold(data, "product.spare-part");
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
