import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { routes } from "./routes";
import { cleanup } from "./scripts";
import { handleExit, handleSigInt, handleSigTerm } from "./utils";

// Handle termination signals
process.on("SIGINT", handleSigInt);
process.on("SIGTERM", handleSigTerm);
process.on("exit", handleExit);

const app = new Elysia()
    .get("/", () => "Hello Elysia")
    .use(cors())
    .use(swagger())
    .use(routes)
    .listen(Number.parseInt(Bun.env.API_PORT || "4000"));

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
