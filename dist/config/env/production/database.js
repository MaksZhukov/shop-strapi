"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_string_1 = require("connection-string");
let config = new connection_string_1.ConnectionString(process.env.JAWSDB_URL);
exports.default = ({ env }) => ({
    connection: {
        client: config.protocol,
        connection: {
            host: config.hosts[0].name,
            port: config.hosts[0].port,
            database: config.path[0],
            user: config.user,
            password: config.password,
            multipleStatements: true
        },
    },
});
