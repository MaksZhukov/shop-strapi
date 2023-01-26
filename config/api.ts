export default ({ env }) => ({
    rest: {
        defaultLimit: 30,
        maxLimit: env("DEFAULT_REST_MAX_LIMIT", 100),
    },
});
