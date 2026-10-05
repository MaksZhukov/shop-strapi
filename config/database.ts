export default ({ env }) => ({
    connection: {
        client: "mysql",
        connection: {
            host: env("DATABASE_HOST", "127.0.0.1"),
            port: env.int("DATABASE_PORT", 3306),
            database: env("DATABASE_NAME", "shop"),
            user: env("DATABASE_USERNAME", "admin"),
            password: env("DATABASE_PASSWORD", "admin"),
            ssl: env.bool("DATABASE_SSL", true),
            multipleStatements: true,
        },
        pool: {
            min: env.int("DATABASE_POOL_MIN", 2),
            max: env.int("DATABASE_POOL_MAX", 20),
            acquireTimeoutMillis: env.int("DATABASE_POOL_ACQUIRE_TIMEOUT", 30000),
        },
        acquireConnectionTimeout: env.int("DATABASE_POOL_ACQUIRE_TIMEOUT", 30000),
    },
});
