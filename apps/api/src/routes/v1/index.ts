import Elysia from "elysia";
import { email } from "./email";

export const v1 = new Elysia({
    prefix: "/v1",
})
    .get("/", async () => {
        return { message: "Hello World!" };
    })
    .use(email);
