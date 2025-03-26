import { Elysia } from "elysia";
import { uploadImagesRoute } from "./routes/upload/images/upload-images";
import swagger from "@elysiajs/swagger";
import cors from "@elysiajs/cors";
import betterAuthView from "./libs/auth/auth-view";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(cors())
  .use(swagger())
  .all("/api/auth/*", betterAuthView)
  .use(uploadImagesRoute)
  .listen(3000);

console.log("hi");
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
