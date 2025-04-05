import Elysia from "elysia";
import betterAuthView from "../../libs/auth/auth-view";
import { email } from "./email";

export const v1 = new Elysia({
    prefix: "/v1",
})
    .get("/", async () => {
        return { message: "Hello World!" };
    })
    .all("/auth/*", betterAuthView)
    .use(email);
