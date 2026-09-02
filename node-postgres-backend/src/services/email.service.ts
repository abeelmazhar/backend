import { emailTransporter } from "../config/email.js";

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string,
) => {
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER;

  const result = await emailTransporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });

  return result;
};
