import { BaseClientConfiguration, GlideClient } from "@valkey/valkey-glide";

const conf: BaseClientConfiguration = {
  addresses: [
    {
      host: Bun.env.VALKEY_HOST || "localhost",
      port: parseInt(Bun.env.VALKEY_PORT || "6379"),
    },
  ],
  clientName: "anime-api-api",
};
export const kvsClient = await GlideClient.createClient(conf);
// import Valkey from "iovalkey";

// export const kvsClient = new Valkey({
//   port: parseInt(Bun.env.VALKEY_PORT || "6379"),
//   host: Bun.env.VALKEY_HOST,
//   username: Bun.env.VALKEY_USER,
//   password: Bun.env.VALKEY_PASS,
//   db: 0,
// });
