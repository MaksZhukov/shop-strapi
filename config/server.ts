import cronTasks from "./cron-tasks";

export default ({ env }) => ({
    host: env("HOST", "0.0.0.0"),
    port: env.int("PORT", 1337),
    app: {
        keys: env.array("APP_KEYS"),
    },
    cron: {
        enabled:
            process.env.NODE_APP_INSTANCE === "0" &&
            process.env.NODE_ENV !== "development",
        tasks: cronTasks,
    },
});
