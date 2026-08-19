import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  res.json({
    message: "Get all users",
  });
};

export const createUser = (req: Request, res: Response) => {
  res.status(201).json({
    message: "Create user",
    user: req.body,
  });
};

export const getUserById = (req: Request, res: Response) => {
  res.json({
    message: "Get user",
    id: req.params.id,
  });
};
