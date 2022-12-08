import { revalidateClientPage } from "../../../../lifecycles";

export default {
    async afterUpdate() {
        revalidateClientPage("/company-photo");
    },
};
