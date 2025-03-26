import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import { routes } from "./routes";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(cors())
  .use(swagger())
  .use(routes)
  .listen(parseInt(Bun.env.API_PORT || "4000"));

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
