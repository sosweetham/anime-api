import { z } from "zod";

export const usernameSignInSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters long")
        .max(30, "Username must be at most 30 characters long")
        .nonempty("Username is required")
        .regex(/^\S*$/, "Username must not contain spaces"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password must be at most 32 characters long")
        .nonempty("Password is required"),
    rememberMe: z.boolean().optional(),
});
