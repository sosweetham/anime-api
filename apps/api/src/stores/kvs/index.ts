import {
    type BaseClientConfiguration,
    GlideClient,
} from "@valkey/valkey-glide";
import { animeAPIConfig } from "../../libs/conf";

console.log("KVS Config", animeAPIConfig.kvsConfig);
const conf: BaseClientConfiguration = {
    addresses: [
        {
            host: animeAPIConfig.kvsConfig.kvsHost,
            port: animeAPIConfig.kvsConfig.kvsPort,
        },
    ],
    clientName: "anime-api-api",
};

export const kvsClient = await GlideClient.createClient(conf);
