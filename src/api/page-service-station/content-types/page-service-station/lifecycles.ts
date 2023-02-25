import { revalidateClientPage } from "../../../../services/client";

export default {
    async afterUpdate() {
        revalidateClientPage("/service-stations");
    },
};
