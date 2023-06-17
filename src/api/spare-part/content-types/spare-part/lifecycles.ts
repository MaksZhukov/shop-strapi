import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import {
    addProductUrlToTelegramAllProductsJobUrls,
    removeFavoritesOnSold,
    scheduleUpdateAltTextForProductImages,
} from "../../../../services";
import { scheduleUpdateImageMetadata } from "../../../../services/imageMetadata";
// import { afterDeleteProduct } from "../../../../lifecycles";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: async (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::spare-part.spare-part"
        );
        scheduleUpdateImageMetadata(data.result, "api::spare-part.spare-part");
        addProductUrlToTelegramAllProductsJobUrls(
            data.result.id,
            "api::spare-part.spare-part"
        );
        lifecycleSitemap();
    },
    afterUpdate: async (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::spare-part.spare-part"
        );
        removeFavoritesOnSold(data, "product.spare-part");
        scheduleUpdateImageMetadata(data.result, "api::spare-part.spare-part");
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
