import { z } from "zod";
import { usernameSignInSchema } from "./username-sign-in-schema";

export const usernameSignUpSchema = usernameSignInSchema.extend({
    email: z
        .string()
        .email("Invalid email address")
        .nonempty("Email is required"),
    confirmPassword: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(32, "Password must be at most 32 characters long")
        .nonempty("Password is required"),
    name: z.string().nonempty("Name is required"),
});
