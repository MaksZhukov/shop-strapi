import { RateLimit } from "koa2-ratelimit";

export default (config, { strapi }) =>
    async (context, next) => {
        const apiToken = strapi.config.get("server.apiToken");
        const token =
            context.request.header.authorization?.split(" ")[1] || null;

        return RateLimit.middleware({
            interval: 1 * 60 * 1000,
            max: token && apiToken === token ? 1000 : 50,
            prefixKey: `${context.request.path}:${context.request.ip}`,
        })(context, next);
    };
