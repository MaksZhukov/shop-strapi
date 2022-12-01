import { revalidateClientPage } from "../../../../lifecycles";

export default {
    afterUpdate() {
        revalidateClientPage("/autocomises");
    },
};
