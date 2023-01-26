export default ({ env }) => ({
    rest: {
        defaultLimit: 31,
        maxLimit: env("DEFAULT_REST_MAX_LIMIT", 100),
    },
});
