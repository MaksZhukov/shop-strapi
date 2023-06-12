import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
    findJobs(ctx) {
        return strapi.plugin("telegram").service("service").findJobs(ctx);
    },
    createJob(ctx) {
        return strapi.plugin("telegram").service("service").createJob(ctx);
    },
    deleteJob(ctx) {
        return strapi
            .plugin("telegram")
            .service("service")
            .deleteJob(ctx.params.id);
    },
});
