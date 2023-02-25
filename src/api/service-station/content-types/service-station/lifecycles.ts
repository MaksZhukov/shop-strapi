import { lifecycleSitemap } from "../../../../lifecycles";
import { revalidateClientPage } from "../../../../services/client";

export default {
    async afterUpdate() {
        revalidateClientPage("/service-stations");
        lifecycleSitemap();
    },
    afterCreate: lifecycleSitemap,
    afterDelete: lifecycleSitemap,
};
