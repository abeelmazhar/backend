import { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  const { role, status } = req.query;

  res.json({
    message: "Get users",
    filters: {
      role,
      status,
    },
  });
};

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    message: "Get user",
    id,
  });
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  res.status(201).json({
    message: "User created",
    user: {
      name,
      email,
    },
  });
};
