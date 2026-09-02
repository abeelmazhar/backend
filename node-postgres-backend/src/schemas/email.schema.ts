import { z } from "zod";

export const sendEmailSchema = z.object({
  to: z.string().email("Invalid recipient email address"),

  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject cannot exceed 200 characters"),

  text: z
    .string()
    .min(1, "Email body is required")
    .max(5000, "Email body cannot exceed 5000 characters"),

  html: z
    .string()
    .max(10000, "HTML body cannot exceed 10000 characters")
    .optional(),
});
