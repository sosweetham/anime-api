import Surreal from "surrealdb";

interface DbConfig {
  url: string;
  namespace: string;
  database: string;
  username: string;
  password: string;
}

// Define the default database configuration
const DEFAULT_CONFIG: DbConfig = {
  url: Bun.env.SURREAL_URL || "http://localhost:8080/rpc",
  namespace: Bun.env.SURREAL_NS || "default",
  database: Bun.env.SURREAL_DB || "default",
  username: Bun.env.SURREAL_USER || "root",
  password: Bun.env.SURREAL_PASS || "root",
};

// Define the function to get the database instance
export async function getDb(
  config: DbConfig = DEFAULT_CONFIG
): Promise<Surreal> {
  const db = new Surreal();

  let shouldRetry = 1;

  while (shouldRetry) {
    // delay of 5 seconds
    try {
      if (shouldRetry !== 1) {
        console.log("Retrying connection to SurrealDB in 5 seconds...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
      }
      await db.connect(config.url, {
        auth: {
          database: config.database,
          namespace: config.namespace,
          username: config.username,
          password: config.password,
        },
      });
      await db.use({
        database: config.database,
        namespace: config.namespace,
      });
      shouldRetry = 0;
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
