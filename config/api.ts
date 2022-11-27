export default ({ env }) => ({
    rest: {
        defaultLimit: 30,
        maxLimit: 100,
        withCount: true,
    },
    "currency-freaks-key": env("CURRENCY_KEY"),
    apiToken: env("API_TOKEN"),
    clientUrl: env("CLIENT_URL"),
    clientLocalUrl: env("CLIENT_LOCAL_URL"),
    revalidateToken: env("REVALIDATE_TOKEN"),
});
