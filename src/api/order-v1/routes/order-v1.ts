/**
 * order-v1 router.
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::order-v1.order-v1", {
    config: {
        update: {
            policies: [
                (policyContext, _config, { strapi }) => {
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
