"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    migrations: {
        enabled: true,
        config: {
            autoStart: true,
            migrationFolderPath: "migrations",
        },
    },
    "entity-relationship-chart": {
        enabled: true,
        config: {
            exclude: [
                "strapi::core-store",
                "webhook",
                "admin::permission",
                "admin::user",
                "admin::role",
                "admin::api-token",
                "plugin::upload.file",
                "plugin::i18n.locale",
                "plugin::users-permissions.permission",
                "plugin::users-permissions.role",
            ],
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
});
