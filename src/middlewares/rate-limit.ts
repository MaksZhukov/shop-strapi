import { RateLimit } from "koa2-ratelimit";

const WRITE_METHODS = ["POST", "PUT", "PATCH", "DELETE"];

// "/api/upload/files/123" -> "/api/upload/files/:id", so a loop over ids
// shares one bucket instead of getting a fresh limit per id.
const normalizePath = (path: string) =>
    path.replace(/\/\d+(?=\/|$)/g, "/:id");

export default (config, { strapi }) =>
    async (context, next) => {
        const apiToken = strapi.config.get("server.apiToken");
        const token =
            context.request.header.authorization?.split(" ")[1] || null;
        const isApiToken = !!token && apiToken === token;
        const isWrite = WRITE_METHODS.includes(context.method);

        if (isWrite) {
            return RateLimit.middleware({
                interval: 1 * 60 * 1000,
                max: isApiToken ? 300 : 50,
                prefixKey: `${context.method}:${normalizePath(
                    context.request.path
                )}:${context.request.ip}`,
            })(context, next);
        }

        return RateLimit.middleware({
            interval: 1 * 60 * 1000,
            max: isApiToken ? 5000 : 50,
            prefixKey: `${context.request.path}:${context.request.ip}`,
        })(context, next);
    };
