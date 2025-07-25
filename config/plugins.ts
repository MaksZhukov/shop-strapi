export default ({ env }) => ({
    redis: {
        config: {
            connections: {
                default: {
                    connection: {
                        host: env("CACHE_HOST", "127.0.0.1"),
                        port: 6379,
                        db: 0,
                    },
                    settings: {
                        debug: false,
                    },
                },
            },
        },
    },
    "strapi-cache": {
        enabled: true,
        config: {
            debug: false, // Enable debug logs
            max: 1000, // Maximum number of items in the cache (only for memory cache)
            ttl: 1000 * 60 * 60, // Time to live for cache items (1 hour)
            size: 1024 * 1024 * 1024, // Maximum size of the cache (1 GB) (only for memory cache)
            allowStale: false, // Allow stale cache items (only for memory cache)
            cacheableRoutes: [], // Caches routes which start with these paths (if empty array, all '/api' routes are cached)
            provider: "memory", // Cache provider ('memory' or 'redis')
            redisConfig: env("REDIS_URL", "redis://localhost:6379"), // Redis config takes either a string or an object see https://github.com/redis/ioredis for references to what object is available, the object or string is passed directly to ioredis client (if using Redis)
            redisClusterNodes: [], // If provided any cluster node (this list is not empty), initialize ioredis redis cluster client. Each object must have keys 'host' and 'port'. See https://github.com/redis/ioredis for references
            redisClusterOptions: {}, // Options for ioredis redis cluster client. redisOptions key is taken from redisConfig parameter above if not set here. See https://github.com/redis/ioredis for references
            cacheHeaders: true, // Plugin also stores response headers in the cache (set to false if you don't want to cache headers)
            cacheHeadersDenyList: [
                "access-control-allow-origin",
                "content-encoding",
            ], // Headers to exclude from the cache (must be lowercase, if empty array, no headers are excluded, cacheHeaders must be true)
            cacheHeadersAllowList: ["content-type", "content-security-policy"], // Headers to include in the cache (must be lowercase, if empty array, all headers are cached, cacheHeaders must be true)
            cacheAuthorizedRequests: false, // Cache requests with authorization headers (set to true if you want to cache authorized requests)
            cacheGetTimeoutInMs: 1000, // Timeout for getting cached data in milliseconds (default is 1 second)
            autoPurgeCache: true, // Automatically purge cache on content CRUD operations
        },
    },

    email: {
        config: {
            provider: "strapi-provider-email-smtp",
            providerOptions: {
                host: env("SMTP_HOST"), //SMTP Host
                port: 465, //SMTP Port
                secure: true,
                username: env("SMTP_USERNAME"),
                password: env("SMTP_PASSWORD"),
                rejectUnauthorized: true,
                requireTLS: true,
                connectionTimeout: 1,
            },
        },
        settings: {
            defaultFrom: env("SMTP_USERNAME"),
            defaultReplyTo: env("SMTP_USERNAME"),
            testAddress: env("SMTP_USERNAME"),
        },
    },
    internal: {
        enabled: true,
        resolve: "./src/plugins/internal",
    },
});
