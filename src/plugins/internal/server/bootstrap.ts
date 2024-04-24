import { Strapi } from "@strapi/strapi";

export default async ({ strapi }: { strapi: Strapi }) => {
    if (!(await strapi.service("plugin::internal.data").find({}))) {
        await strapi.service("plugin::internal.data").createOrUpdate({
            data: { currencyCoefficient: { usd: 0, rub: 0 } },
        });
    }
};
