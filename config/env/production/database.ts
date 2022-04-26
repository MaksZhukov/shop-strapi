import { ConnectionString } from "connection-string";

let config = new ConnectionString(
  process.env.JAWSDB_URL
);

export default ({ env }) => ({
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
