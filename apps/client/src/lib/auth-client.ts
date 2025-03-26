import { createAuthClient } from "better-auth/svelte"
export const authClient =  createAuthClient({
    baseURL: "http://localhost:3000/api/auth" // the base url of your auth server
})