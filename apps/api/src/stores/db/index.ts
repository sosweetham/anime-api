import Surreal from "surrealdb";

interface DbConfig {
  url: string;
  namespace: string;
  database: string;
}

// Define the default database configuration
const DEFAULT_CONFIG: DbConfig = {
  url: "http://anime-api-database:8000/rpc",
  namespace: "anime-api",
  database: "anime-api",
};

// Define the function to get the database instance
export async function getDb(
  config: DbConfig = DEFAULT_CONFIG
): Promise<Surreal> {
  const db = new Surreal();

  let shouldRetry = true;

  while (shouldRetry) {
    // delay of 5 seconds
    console.log("Retrying connection to SurrealDB in 5 seconds...");
    await new Promise((resolve) => setTimeout(resolve, 5000));
    try {
      await db.connect(config.url, {
        auth: {
          database: config.database,
          namespace: config.namespace,
          username: "toomuchham",
          password: "ball",
        },
      });
      await db.use({
        database: config.database,
        namespace: config.namespace,
      });
      shouldRetry = false;
    } catch (err) {
      console.error(
        "Failed to connect to SurrealDB:",
        err instanceof Error ? err.message : String(err)
      );
      await db.close();
    }
  }
  return db;
}

export const db = await getDb();
