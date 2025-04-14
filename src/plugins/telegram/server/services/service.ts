//@ts-nocheck
import { Strapi } from "@strapi/strapi";
import fs from "fs";
import TelegramBot from "node-telegram-bot-api";
import path from "path";
import {
    addTelegramInterval,
    createJobUrls,
    runArrayIterationPartly,
    runProductsUrlsQueriesWithLimit,
} from "./helpers";

export default ({ strapi }: { strapi: Strapi }) => {
    const token = strapi.config.get("server.telegramBotToken");
    const bot = new TelegramBot(token, { polling: true });
    const jobsIntervalIds = {};
    return {
        bot,
        jobsIntervalIds,
        async findJobs() {
            const data = await strapi.db
                .query("plugin::telegram.jobs")
                .findMany({});
            return { data };
        },
        async createJob(ctx) {
            const { filePath, ...restBody } = ctx.request.body;
            const job = await strapi.db.query("plugin::telegram.jobs").create({
                data: restBody,
            });
            if (filePath) {
                const pathToTxt = path.join(process.cwd(), "public", filePath);
                const text = await fs.promises.readFile(pathToTxt, "utf-8");
                fs.promises.unlink(pathToTxt);
                const productUrls = text.split("\n");
                await runArrayIterationPartly(
                    productUrls,
                    1000,
                    async (urls) => {
                        await createJobUrls(job.id, urls);
                    }
                );
            } else {
                await runProductsUrlsQueriesWithLimit(strapi, async (urls) => {
                    await createJobUrls(job.id, urls);
                });
            }
            this.runTelegramMessages();
            return { data: job };
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
        async runTelegramMessages() {
            Object.keys(jobsIntervalIds).forEach((key) => {
                clearInterval(jobsIntervalIds[key]);
            });
            const data = await strapi.db
                .query("plugin::telegram.jobs")
                .findMany();
            data.forEach((item) => {
                jobsIntervalIds[item.id] = addTelegramInterval(
                    bot,
                    item.id,
                    item.interval,
                    jobsIntervalIds
                );
            });
        },
    };
};
