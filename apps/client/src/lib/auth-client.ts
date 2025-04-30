import { createAuthClient } from "better-auth/client";
import { usernameClient } from "better-auth/client/plugins";
import { runtime } from "./controllers/runtime.svelte";

export const authClient = createAuthClient({
    /** the base url of the server (optional if you're using the same domain) */
    baseURL: "http://localhost:3000/api/v1/auth",
    plugins: [usernameClient()],
});

export const getSessionData = async () => {
    const { data, error } = await authClient.getSession();
    if (error) {
        runtime.signedIn = false;
        return;
    }
    runtime.signedIn = !!data?.user;
    return data;
};
