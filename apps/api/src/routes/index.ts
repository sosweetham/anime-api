import Elysia from "elysia";
import betterAuthView from "../libs/auth/auth-view";
import { uploadImagesRoute } from "./upload/images/upload-images";

export const routes = new Elysia()
  .all("/api/auth/*", betterAuthView)
  .use(uploadImagesRoute);
