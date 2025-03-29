import Elysia, { t } from "elysia";
import { emailTransporter } from "../../../libs/email";

export const email = new Elysia().post(
    "test",
    async ({ body }) => {
        const html = "Hi, this is a test";

        await emailTransporter.sendMail({
            from: "ham@mail.kodski.com",
            to: body.email,
            subject: "Test Email",
            html,
        });

        return { success: true };
    },
    {
        body: t.Object({
            email: t.String({ format: "email" }),
        }),
    },
);
