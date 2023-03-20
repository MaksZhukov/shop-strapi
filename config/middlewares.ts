export default [
    "strapi::errors",
    "strapi::security",
    "strapi::cors",
    "strapi::poweredBy",
    "strapi::logger",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
    "global::rate-limit",
    "global::rest-limit",
    ...(process.env.NODE_ENV !== "production"
        ? ["global::catching-errors"]
        : []),
];
