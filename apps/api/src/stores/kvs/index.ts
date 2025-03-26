import { GlideClient } from "@valkey/valkey-glide";

const addresses = [
  {
    host: "anime-api-kvs",
    port: 6379,
  },
];

export const kvsClient = await GlideClient.createClient({
  addresses: addresses,
  clientName: "anime_api_client",
});
