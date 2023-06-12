import { Strapi } from "@strapi/strapi";

export default ({ strapi }: { strapi: Strapi }) => ({
    async findJobs() {
        const data = await strapi.db
            .query("plugin::telegram.jobs")
            .findMany({});
        return { data };
    },
    async createJob(ctx) {
        console.log(ctx.request.body);
        // const res = await strapi.db
        //     .query("plugin::telegram.urls")
        //     .createMany({ data: [{ url: "1" }], select: ["id"] });

        // const job = await strapi.db.query("plugin::telegram.jobs").create({
        //     //@ts-expect-error error
        //     data: { startDate, endDate, urls: res.ids },
        // });
        // return { data: job };
    },
    async deleteJob(id) {
        const urls = await strapi.db
            .query("plugin::telegram.urls")
            .findMany({ where: { job: id }, select: ["id"] });
        await strapi.db
            .query("plugin::telegram.urls")
            .deleteMany({ where: { id: urls.map((item) => item.id) } });
        return await strapi.db
            .query("plugin::telegram.jobs")
            .delete({ where: { id } });
    },
});
