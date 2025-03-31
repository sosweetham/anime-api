import Elysia from "elysia";
import { email } from "./email";
import betterAuthView from "../../libs/auth/auth-view";

export const v1 = new Elysia({
    prefix: "/v1",
})
    .get("/", async () => {
        return { message: "Hello World!" };
    })
    .all("/auth/*", betterAuthView)
    .use(email);
