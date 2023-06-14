import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import {
    removeFavoritesOnSold,
    scheduleUpdateAltTextForProductImages,
} from "../../../../services";
import { scheduleUpdateImageMetadata } from "../../../../services/imageMetadata";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        scheduleUpdateAltTextForProductImages(data.result, "api::wheel.wheel");
        scheduleUpdateImageMetadata(data.result, "api::wheel.wheel");
        lifecycleSitemap();
    },
    afterUpdate: (data) => {
        scheduleUpdateAltTextForProductImages(data.result, "api::wheel.wheel");
        removeFavoritesOnSold(data, "product.wheel");
        scheduleUpdateImageMetadata(data.result, "api::wheel.wheel");
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
