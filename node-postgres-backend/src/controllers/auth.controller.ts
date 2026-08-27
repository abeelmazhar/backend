import { Request, Response } from "express";
import * as authService from "../services/auth.service.js";
import { AppError } from "../errors/app.error.js";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user = await authService.registerUser(name, email, password);

  res.status(201).json({
    user,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await authService.loginUser(email, password);

  res.status(200).json({
    user,
  });
};
