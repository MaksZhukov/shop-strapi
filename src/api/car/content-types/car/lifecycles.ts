import {
    beforeCreateOrUpdateCar,
    lifecycleSitemap,
} from "../../../../lifecycles";

export default {
    beforeCreate: beforeCreateOrUpdateCar,
    beforeUpdate: beforeCreateOrUpdateCar,
    afterUpdate: lifecycleSitemap,
    afterCreate: lifecycleSitemap,
    afterDelete: lifecycleSitemap,
};
