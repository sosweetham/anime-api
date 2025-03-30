import { z } from "zod";

export const emailSignInSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .nonempty("Password is required"),
    rememberMe: z.boolean().optional(),
});
