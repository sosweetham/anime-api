import Surreal from "surrealdb";
import { animeAPIConfig, type DbConfig } from "../../libs/conf";

// Define the default database configuration
const DEFAULT_CONFIG: DbConfig = animeAPIConfig.dbConfig;

// Define the function to get the database instance
export async function getDb(
    config: DbConfig = DEFAULT_CONFIG
): Promise<Surreal> {
    const db = new Surreal();

    let shouldRetry = 1;
    console.log("Connecting to SurrealDB...");
    while (shouldRetry) {
        try {
            if (shouldRetry !== 1) {
                console.log("Retrying connection to SurrealDB in 5 seconds...");
                await new Promise((resolve) => setTimeout(resolve, 5000));
            }
            await db.connect(config.dbUrl, {
                auth: {
                    username: config.dbUsername,
                    password: config.dbPassword,
                },
            });
            await db.use({
                database: config.dbDatabase,
                namespace: config.dbNamespace,
            });
            shouldRetry = 0;
        } catch (err) {
            console.error(
                "Failed to connect to SurrealDB:",
                err instanceof Error ? err.message : String(err)
            );
            await db.close();
        }
        if (shouldRetry) {
            shouldRetry++;
        }
    }
    console.log("Connected to SurrealDB!");
    return db;
}

export const db = await getDb();
