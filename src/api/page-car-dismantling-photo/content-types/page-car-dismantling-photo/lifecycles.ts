import { revalidateClientPage } from "../../../../lifecycles";

export default {
    async afterUpdate() {
        revalidateClientPage("/car-dismantling-photos");
    },
};
