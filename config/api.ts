export default ({ env }) => ({
    rest: {
        defaultLimit: 5,
        maxLimit: env("DEFAULT_REST_MAX_LIMIT", 100),
    },
});
