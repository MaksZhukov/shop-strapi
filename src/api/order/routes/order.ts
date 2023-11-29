/**
 * order router.
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::order.order", {
    config: {
        update: {
            policies: [
                (policyContext, config, { strapi }) => {
                    return (
                        //@ts-expect-error error
                        policyContext.state.auth.credentials.type ===
                        "full-access"
                    );
                },
            ],
        },
    },
});
