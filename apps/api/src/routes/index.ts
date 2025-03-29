import Elysia from "elysia";
import { v1 } from "./v1";

export const routes = new Elysia().use(v1);
