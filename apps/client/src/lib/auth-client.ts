import { createAuthClient } from "better-auth/client";
export const authClient = createAuthClient({
    /** the base url of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000",
});
