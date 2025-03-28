// import { Elysia, t } from "elysia";

// import * as React from "react";
// import { renderToStaticMarkup } from "react-dom/server";

// import OTPEmail from './emails/otp'

import nodemailer from "nodemailer";

export const emailTransporter = nodemailer.createTransport({
  host: Bun.env.SMTP_HOST,
  port: parseInt(Bun.env.SMTP_PORT || "465"),
  auth: {
    user: Bun.env.SMTP_USER,
    pass: Bun.env.SMTP_PASS,
  },
});

// export const sampleMail = new Elysia().get(
//   "/otp",
//   async ({ body }) => {
//     // Random between 100,000 and 999,999
//     //   const otp = ~~(Math.random() * (900_000 - 1)) + 100_000;

//     //   const html = renderToStaticMarkup(<OTPEmail otp={otp} />);
//     const html = `HI`;

//     await transporter.sendMail({
//       from: "ibuki@gehenna.sh",
//       to: body,
//       subject: "Verify your email address",
//       html,
//     });

//     return { success: true };
//   },
//   {
//     body: t.String({ format: "email" }),
//   }
// );
