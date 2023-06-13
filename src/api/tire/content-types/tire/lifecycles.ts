import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import {
    removeFavoritesOnSold,
    scheduleUpdateAltTextForProductImages,
} from "../../../../services";
import { scheduleUpdateImageMetadata } from "../../../../services/imageMetadata";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        scheduleUpdateAltTextForProductImages(data.result, "api:tire.tire");
        scheduleUpdateImageMetadata(data.result, "api::tire.tire");
        lifecycleSitemap();
    },
    afterUpdate: (data) => {
        scheduleUpdateAltTextForProductImages(data.result, "api::tire.tire");
        removeFavoritesOnSold(data, "product.tire");
        scheduleUpdateImageMetadata(data.result, "api::tire.tire");
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
