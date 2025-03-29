import {
    type BaseClientConfiguration,
    GlideClient,
} from "@valkey/valkey-glide";

const conf: BaseClientConfiguration = {
    addresses: [
        {
            host: Bun.env.VALKEY_HOST || "localhost",
            port: Number.parseInt(Bun.env.VALKEY_PORT || "6379"),
        },
    ],
    clientName: "anime-api-api",
};

export const kvsClient = await GlideClient.createClient(conf);
