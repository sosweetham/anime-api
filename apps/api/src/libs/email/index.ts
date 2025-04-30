// import { Elysia, t } from "elysia";

// import * as React from "react";
// import { renderToStaticMarkup } from "react-dom/server";

// import OTPEmail from './emails/otp'

import nodemailer from "nodemailer";
import { animeAPIConfig } from "../conf";

export const emailTransporter = nodemailer.createTransport({
    host: animeAPIConfig.smtpConfig.smtpHost,
    port: animeAPIConfig.smtpConfig.smtpPort,
    auth: {
        user: animeAPIConfig.smtpConfig.smtpUser,
        pass: animeAPIConfig.smtpConfig.smtpPass,
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
