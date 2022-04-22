"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    auth: {
        secret: env('ADMIN_JWT_SECRET', 'f2e3bd71aa77dcd6ae6133f21e1ed4d2'),
    },
});
