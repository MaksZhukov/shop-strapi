import { ConnectionString } from "connection-string";
console.log(process.env.DATABASE_URL);
let config = new ConnectionString(
  process.env.DATABASE_URL ||
    "mysql://bv7k4jliyno5318p:i6cnbvxc45mvq4n1@bv2rebwf6zzsv341.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/x301h9xkya7zzaj9"
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
    },
  },
});
