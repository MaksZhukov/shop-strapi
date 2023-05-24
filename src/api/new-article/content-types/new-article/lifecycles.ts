import { lifecycleSitemap } from "../../../../lifecycles";
import { revalidateClientPage } from "../../../../services/client";

export default {
    afterDelete: lifecycleSitemap,
    afterCreate: lifecycleSitemap,
    afterUpdate() {
        lifecycleSitemap();
    },
};
