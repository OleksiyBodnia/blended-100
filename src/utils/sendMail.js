import nodemailer from "nodemailer";
import { env } from "./env-config.js";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: true,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

export const sendMail = async (options) => {
  return await transporter.sendMail(options);
};
