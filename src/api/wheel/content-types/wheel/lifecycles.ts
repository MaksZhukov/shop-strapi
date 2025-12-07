import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import { scheduleUpdateAltTextForProductImages } from "../../../../services";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::wheel.wheel",
            "api::page-product-wheel.page-product-wheel"
        );
        // addProductUrlToTelegramAllProductsJobUrls(
        //     data.result.id,
        //     "api::wheel.wheel"
        // );
        lifecycleSitemap();
    },
    beforeUpdate: async (data) => {
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
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
