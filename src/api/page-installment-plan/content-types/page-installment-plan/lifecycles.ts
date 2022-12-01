import { revalidateClientPage } from "../../../../lifecycles";

export default {
    async afterUpdate() {
        revalidateClientPage("/installment-plan");
    },
};
