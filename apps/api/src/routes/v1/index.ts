import Elysia from "elysia";
import betterAuthView from "../../libs/auth/auth-view";
import { email } from "./email";

export const v1 = new Elysia({
    prefix: "/v1",
})
    .all("/auth/*", betterAuthView)
    .use(email);
