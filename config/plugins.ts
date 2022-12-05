export default ({ env }) => ({
    "rest-cache": {
        enabled: false,
        config: {
            provider: {
                name: "memory",
                options: {
                    max: 32767,
                    maxAge: 3600,
                },
            },
            strategy: {
                contentTypes: [
                    "api::wheel.wheel",
                    "api::spare-part.spare-part",
                    "api::tire.tire",
                    "api::cabin.cabin",
                    "api::car.car",
                    "api::review.review",
                    "api::model.model",
                    "api::brand.brand",
                ],
            },
        },
    },
    transformer: {
        enabled: true,
        config: {
            responseTransforms: {
                removeAttributesKey: true,
                removeDataKey: true,
            },
        },
    },
    // "generate-data": {
    // enabled: true,
    // resolve: "src/plugins/strapi-plugin-generate-data",
    // },
    email: {
        config: {
            provider: "strapi-provider-email-smtp",
            providerOptions: {
                host: env("SMTP_HOST"), //SMTP Host
                port: 465, //SMTP Port
                secure: true,
                username: env("SMTP_USERNAME"),
                password: env("SMTP_PASSWORD"),
                rejectUnauthorized: true,
                requireTLS: true,
                connectionTimeout: 1,
            },
        },
        settings: {
            defaultFrom: env("SMTP_USERNAME"),
            defaultReplyTo: env("SMTP_USERNAME"),
            testAddress: env("SMTP_USERNAME"),
        },
    },
    ckeditor: {
        enabled: true,
    },
    internal: {
        enabled: true,
        resolve: "./src/plugins/internal",
    },
});
