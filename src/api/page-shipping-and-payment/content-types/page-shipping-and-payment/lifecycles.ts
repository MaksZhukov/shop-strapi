import { revalidateClientPage } from "../../../../lifecycles";

export default {
    async afterUpdate() {
        revalidateClientPage('/shipping-and-payment"');
    },
};
