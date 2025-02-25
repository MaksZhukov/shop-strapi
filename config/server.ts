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
    serverUrl: env("SERVER_URL"),
    emailForNewProducts: env("EMAIL_FOR_NEW_PRODUCTS"),
    apiToken: env("API_TOKEN"),
    clientUrl: env("CLIENT_URL"),
    clientLocalUrl: env("CLIENT_LOCAL_URL"),
    revalidateToken: env("REVALIDATE_TOKEN"),
    bepaidShopId: env("BEPAID_SHOP_ID"),
    bepaidShopKey: env("BEPAID_SHOP_KEY"),
    telegramBotToken: env("TELEGRAM_BOT_TOKEN"),
    telegramChatId: env("TELEGRAM_CHAT_ID"),
});
