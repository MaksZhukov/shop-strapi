export default [
    "strapi::logger",
    "strapi::errors",
    "strapi::security",
    {
        name: "strapi::cors",
        config: {
            credentials: true,
        },
    },
    "strapi::poweredBy",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
    "global::rate-limit",
    "global::auth-cookies",
    ...(process.env.NODE_ENV === "production"
        ? ["global::catching-errors"]
        : []),
];
