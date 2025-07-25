export default [
    "strapi::logger",
    "strapi::errors",
    "strapi::security",
    "strapi::cors",
    "strapi::poweredBy",
    "strapi::query",
    "strapi::body",
    "strapi::session",
    "strapi::favicon",
    "strapi::public",
    "global::rate-limit",
    ...(process.env.NODE_ENV === "production"
        ? ["global::catching-errors"]
        : []),
];
