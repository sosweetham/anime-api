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
    return db;
  } catch (err) {
    console.error(
      "Failed to connect to SurrealDB:",
      err instanceof Error ? err.message : String(err)
    );
    await db.close();
    throw err;
  }
}

export const db = await getDb();
