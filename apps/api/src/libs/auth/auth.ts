import { TimeUnit } from "@valkey/valkey-glide";
import { betterAuth } from "better-auth";
import { surrealAdapter } from "surreal-better-auth";
import { db } from "../../stores/db";
import { kvsClient } from "../../stores/kvs";

export const auth = betterAuth({
    database: surrealAdapter(db),
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: ["http://localhost:5173"],
    secondaryStorage: {
        get: async (key: string) => {
            const value = (await kvsClient.get(key))?.toString();
            return value ? value : null;
        },
        set: async (key, value, ttl) => {
            if (ttl)
                await kvsClient.set(key, value, {
                    expiry: { type: TimeUnit.Milliseconds, count: ttl },
                });
            // or for ioredis:
            // if (ttl) await redis.set(key, value, 'EX', ttl)
            else await kvsClient.set(key, value);
        },
        delete: async (key) => {
            await kvsClient.del([key]);
        },
    },
});
