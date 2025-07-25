export default ({ env }) => ({
    connection: {
        client: "mysql",
        connection: {
            host: env("DATABASE_HOST", "127.0.0.1"),
            port: env.int("DATABASE_PORT", 3306),
            database: env("DATABASE_NAME", "shop"),
            user: env("DATABASE_USERNAME", "admin"),
            password: env("DATABASE_PASSWORD", "admin"),
            ssl: env.bool("DATABASE_SSL", false)
                ? {
                      rejectUnauthorized: false,
                  }
                : false,
            multipleStatements: true,
            charset: "utf8mb4",
            pool: {
                min: 0,
                max: 10,
                acquireTimeoutMillis: 60000,
                createTimeoutMillis: 60000,
                destroyTimeoutMillis: 60000,
                idleTimeoutMillis: 60000,
                reapIntervalMillis: 1000,
                createRetryIntervalMillis: 100,
            },
        },
        settings: {
            sql_mode:
                "STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO",
        },
    },
});
