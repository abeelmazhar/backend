import { Request, Response, NextFunction } from "express";
import * as userService from "../services/user.service.js";
import { AppError } from "../utils/app-error.js";

export const getUsers = (req: Request, res: Response) => {
  const users = userService.getUsers();

  res.status(200).json({
    users,
  });
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = Number(req.params.id);

  const user = userService.getUserById(id);

  if (!user) {
    next(new AppError("User not found", 404));
    return;
  }

  res.status(200).json({
    user,
  });
};

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  const user = userService.createUser(name, email);

  res.status(201).json({
    user,
  });
};

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  const user = userService.updateUser(id, req.body);

  if (!user) {
    next(new AppError("User not found", 404));
    return;
  }

  res.status(200).json({
    user,
  });
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  const id = Number(req.params.id);

  const user = userService.deleteUser(id);

  if (!user) {
    next(new AppError("User not found", 404));
    return;
  }

  res.status(200).json({
    message: "User deleted successfully",
  });
};
