export default ({ env }) => ({
    connection: {
        client: "mysql",
        connection: {
            host: env("DATABASE_HOST", "127.0.0.1"),
            port: env.int("DATABASE_PORT", 3306),
            database: env("DATABASE_NAME", "razbor_auto"),
            user: env("DATABASE_USERNAME", "razbor_auto"),
            password: env("DATABASE_PASSWORD", "TxH#CUcL29Y7HvzS"),
            ssl: env.bool("DATABASE_SSL", true),
            multipleStatements: true,
        },
    },
});
