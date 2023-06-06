import { beforeCreateOrUpdateCar } from "../../../../lifecycles";
import { revalidateClientPage } from "../../../../services/client";

export default {
    beforeCreate: beforeCreateOrUpdateCar,
    beforeUpdate: beforeCreateOrUpdateCar,
    async afterUpdate() {
        revalidateClientPage("/buyback-cars");
    },
    async afterCreate() {
        revalidateClientPage("/buyback-cars");
    },
    async afterDelete() {
        revalidateClientPage("/buyback-cars");
    },
};
