import { beforeCreateProduct, lifecycleSitemap } from "../../../../lifecycles";
import { scheduleUpdateAltTextForProductImages } from "../../../../services";

export default {
    beforeCreate: beforeCreateProduct,
    afterCreate: (data) => {
        scheduleUpdateAltTextForProductImages(
            data.result,
            "api::tire.tire",
            "api::page-product-tire.page-product-tire"
        );
        // addProductUrlToTelegramAllProductsJobUrls(
        //     data.result.id,
        //     "api::tire.tire"
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
            "api::tire.tire",
            "api::page-product-tire.page-product-tire"
        );
        lifecycleSitemap();
    },
    afterDelete: lifecycleSitemap,
    // afterDelete: afterDeleteProduct,
};
