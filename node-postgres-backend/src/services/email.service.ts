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

export const sendVerificationEmail = async (to: string, token: string) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const verificationLink = `${frontendUrl}/verify-email?token=${token}`;

  const subject = "Verify your email address";

  const text = `Please verify your email by opening this link: ${verificationLink}`;

  const html = `
    <h2>Verify your email</h2>
    <p>Click the link below to verify your email address:</p>
    <p><a href="${verificationLink}">Verify Email</a></p>
    <p>This link expires in 24 hours.</p>
  `;

  return sendEmail(to, subject, text, html);
};
