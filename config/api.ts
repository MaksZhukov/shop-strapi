export default ({ env }) => ({
    rest: {
        defaultLimit: 30,
        maxLimit: 100,
        withCount: true,
    },
    "currency-freaks-key": env("CURRENCY_KEY"),
});
