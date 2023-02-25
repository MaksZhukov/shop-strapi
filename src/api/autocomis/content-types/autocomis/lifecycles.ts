import { lifecycleSitemap } from "../../../../lifecycles";
import { revalidateClientPage } from "../../../../services/client";

export default {
    afterUpdate() {
        revalidateClientPage("/autocomises");
        lifecycleSitemap();
    },
    afterCreate: lifecycleSitemap,
    afterDelete: lifecycleSitemap,
};
