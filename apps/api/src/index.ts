import { Elysia } from "elysia";
import { uploadImagesRoute } from "./routes/upload/images/upload-images";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(uploadImagesRoute)
  .listen(3000);
console.log("hi");
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
