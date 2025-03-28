import Elysia from "elysia";
import betterAuthView from "../libs/auth/auth-view";
import { uploadImagesRoute } from "./upload/images/upload-images";
import { emailController } from "./email";

export const routes = new Elysia()
  .all("/api/auth/*", betterAuthView)
  .use(uploadImagesRoute)
  .all("/email/*", emailController);
