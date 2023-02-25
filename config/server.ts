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
    "currency-freaks-key": env("CURRENCY_KEY"),
    emailForNewProducts: env("EMAIL_FOR_NEW_PRODUCTS"),
    apiToken: env("API_TOKEN"),
    clientUrl: env("CLIENT_URL"),
    clientLocalUrl: env("CLIENT_LOCAL_URL"),
    revalidateToken: env("REVALIDATE_TOKEN"),
    frontendNearFolderPath: env("FRONTEND_NEAR_FOLDER_PATH"),
    bepaidShopId: env("BEPAID_SHOP_ID"),
    bepaidShopKey: env("BEPAID_SHOP_KEY"),
    cryptoAlgorithm: env("CRYPTO_ALGORITHM"),
    cryptoKey: env("CRYPTO_KEY"),
    cryptoIV: env("CRYPTO_IV"),
});
