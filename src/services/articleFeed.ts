import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { extract } from "@extractus/article-extractor";
const parser = new XMLParser();

export const getArticleFeed = async () => {
    const input =
        "https://autogrodno.by/22-news/2/28364-kuznica-ezhu-protiv-tankov.html";

    // here we use top-level await, assume current platform supports it
    try {
        const article = await extract(input);
        // await strapi.services('api::article.article');
        await strapi.service("api::article.article").create({
            data: { name: article.title, description: article.content },
        });
    } catch (err) {
        console.error(err);
    }
    // const brandNames = (
    //     await strapi.service("api::brand.brand").find({
    //         filters: {
    //             spareParts: {
    //                 id: {
    //                     $notNull: true,
    //                 },
    //             },
    //         },
    //     })
    // ).results.map((item) => item.name.toLowerCase());
    // console.log(brandNames);
    // const articlesFeedSources = (
    //     await strapi
    //         .service("api::articles-feed-source.articles-feed-source")
    //         .find({ populate: ["sources"] })
    // ).sources;
    // const feed = (
    //     await Promise.all(articlesFeedSources.map((item) => axios(item.value)))
    // )
    //     .map((item) => parser.parse(item.data))
    //     .map((item) => item.rss.channel.item)
    //     .flat();
    // return feed
    //     .filter((item) =>
    //         brandNames.some(
    //             (name) =>
    //                 item.title.toLowerCase().includes(name) ||
    //                 item.description.toLowerCase().includes(name)
    //         )
    //     )
    //     .map((item) => item.link);
};
