import Elysia from "elysia";
import { v1 } from "./v1";

export const routes = new Elysia({ prefix: "/api" }).use(v1);
