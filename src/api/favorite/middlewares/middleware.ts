import { RateLimit } from 'koa2-ratelimit';

export default (config, { strapi }) => async (context, next) => {
    return RateLimit.middleware({
        interval: 1 * 60 * 1000,
        max: 50,
        prefixKey: `${context.request.path}:${context.request.ip}`,
    })(context, next);
}