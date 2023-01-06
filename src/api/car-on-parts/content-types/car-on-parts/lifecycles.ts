import {
    beforeCreateOrUpdateCar,
    revalidateClientPage,
} from "../../../../lifecycles";

export default {
    beforeCreate: beforeCreateOrUpdateCar,
    beforeUpdate: beforeCreateOrUpdateCar,
    async afterUpdate() {
        revalidateClientPage("/buyback-cars");
    },
};
