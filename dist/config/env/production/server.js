"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    proxy: true,
    url: env('MY_HEROKU_URL'),
    app: {
        keys: env.array('APP_KEYS')
    },
});
