import { revalidateClientPage } from "../../../../services/client";

export default {
    async afterUpdate() {
        revalidateClientPage("/how-to-get-to");
    },
};
