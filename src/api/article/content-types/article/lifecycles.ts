import { lifecycleSitemap, revalidateClientPage } from "../../../../lifecycles";

export default {
    afterDelete: lifecycleSitemap,
    afterCreate: lifecycleSitemap,
    afterUpdate() {
        revalidateClientPage("/articles");
        lifecycleSitemap();
    },
};
