import { Request, Response } from "express";
import * as authService from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await authService.registerUser(name, email, password);

  res.status(201).json({
    message: "Registration successful. Please check your email to verify your account.",
    user,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { user, token } = await authService.loginUser(email, password);

  res.status(200).json({
    user,
    token,
  });
};

export const verifyEmail = async (req: Request, res: Response) => {
  const token = req.body.token ?? req.query.token;

  const user = await authService.verifyEmail(token as string);

  res.status(200).json({
    message: "Email verified successfully",
    user,
  });
};
