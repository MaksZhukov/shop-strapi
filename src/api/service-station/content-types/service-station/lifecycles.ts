import { lifecycleSitemap, revalidateClientPage } from "../../../../lifecycles";

export default {
    async afterUpdate() {
        revalidateClientPage("/service-stations");
        lifecycleSitemap();
    },
    afterCreate: lifecycleSitemap,
    afterDelete: lifecycleSitemap,
};
