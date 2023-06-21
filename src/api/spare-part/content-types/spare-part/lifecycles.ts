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
// import { afterDeleteProduct } from "../../../../lifecycles";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: async (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::spare-part.spare-part",
            "api::page-product-spare-part.page-product-spare-part"
        );
        scheduleUpdateImageMetadataAfterCreate(
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
        await scheduleUpdateImageMetadataBeforeUpdate(
            data,
            "api::spare-part.spare-part"
        );
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
