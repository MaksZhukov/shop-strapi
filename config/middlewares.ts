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
    ...(process.env.NODE_ENV === "proruction"
        ? ["global::catching-errors"]
        : []),
];
