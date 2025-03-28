import { readdirSync, unlinkSync } from "fs";
import { join } from "path";

const TMP_DIR = "/tmp";
const SOCKET_PREFIX = "glide-socket-";

// Valkey Glide basically doesnt work well with docker compose sync so am handling some cleanup manually here

export const cleanup = () => {
  if (Bun.env.PLATFORM === "CONTAINER") {
    try {
      const files = readdirSync(TMP_DIR);
      for (const file of files) {
        if (file.startsWith(SOCKET_PREFIX)) {
          const filePath = join(TMP_DIR, file);
          unlinkSync(filePath);
          console.log(`Cleaned up socket file: ${filePath}`);
        }
      }
    } catch (error) {
      console.error("Error cleaning up socket files:", error);
    }
  }
  return;
};
