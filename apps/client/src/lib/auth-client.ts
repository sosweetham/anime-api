import { createAuthClient } from "better-auth/client";
import { usernameClient } from "better-auth/client/plugins";
export const authClient = createAuthClient({
    /** the base url of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000/api/v1/auth",
    plugins: [usernameClient()],
});
