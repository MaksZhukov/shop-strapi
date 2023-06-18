//@ts-nocheck
import { Strapi } from "@strapi/strapi";
import fs from "fs";
import TelegramBot from "node-telegram-bot-api";
import path from "path";
import {
    addTelegramInterval,
    createJobUrls,
    runProductsUrlsQueriesWithLimit,
} from "./helpers";

export default ({ strapi }: { strapi: Strapi }) => {
    const token = strapi.config.get("server.telegramBotToken");
    const chatId = strapi.config.get("server.telegramChatId");
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
                const text = fs.readFileSync(pathToTxt, "utf-8");
                fs.unlinkSync(pathToTxt);
                const productUrls = text.split("\n");
                await createJobUrls(job.id, productUrls);
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
                .findMany({ populate: { urls: true } });
            let currentDate = new Date();
            data.forEach((item) => {
                const count = item.urls.length;
                const startDate = new Date(item.startDate);
                const endDate = new Date(item.endDate);
                if (startDate.getTime() < currentDate.getTime()) {
                    const ms =
                        (endDate.getTime() - currentDate.getTime()) / count;
                    jobsIntervalIds[item.id] = addTelegramInterval(
                        bot,
                        item.id,
                        ms,
                        jobsIntervalIds
                    );
                } else {
                    setTimeout(() => {
                        const ms =
                            (endDate.getTime() - new Date().getTime()) / count;
                        jobsIntervalIds[item.id] = addTelegramInterval(
                            bot,
                            item.id,
                            ms,
                            jobsIntervalIds
                        );
                    }, startDate.getTime() - currentDate.getTime());
                }
            });
        },
    };
};
