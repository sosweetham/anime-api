import { betterAuth } from "better-auth";
import { surrealAdapter } from "surreal-better-auth";
import { db } from "../../stores/db";

export const auth = betterAuth({
  database: surrealAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:5173"],
});
