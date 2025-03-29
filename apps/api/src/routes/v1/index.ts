import Elysia from "elysia";
import { email } from "./email";
import betterAuthView from "../../libs/auth/auth-view";

export const v1 = new Elysia({
    prefix: "/v1",
})
    .all("/auth/*", betterAuthView)
    .use(email);
