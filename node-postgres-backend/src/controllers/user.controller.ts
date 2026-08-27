import { Request, Response } from "express";
import * as userService from "../services/user.service.js";
import { AppError } from "../errors/app.error.js";

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json({
      users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Get a user by id
export const getUserById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = await userService.getUserById(id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  res.status(200).json({
    user,
  });
};

// Create a user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const user = await userService.createUser(name, email);

    res.status(201).json({
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const { name, email } = req.body;

    const user = await userService.updateUser(id, name, email);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const user = await userService.deleteUser(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getCurrentUser = async (req: Request, res: Response) => {
  const userId = req.userId!;

  const user = await userService.getUserById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  res.status(200).json({
    user,
  });
};
