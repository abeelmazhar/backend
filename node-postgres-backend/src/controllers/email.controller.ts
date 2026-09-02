import { Request, Response } from "express";

import * as emailService from "../services/email.service.js";

export const sendEmail = async (req: Request, res: Response) => {
  const { to, subject, text, html } = req.body;

  const result = await emailService.sendEmail(to, subject, text, html);

  res.status(200).json({
    message: "Email sent successfully",
    messageId: result.messageId,
  });
};
