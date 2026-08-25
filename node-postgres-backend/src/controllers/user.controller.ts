import { Request, Response } from "express";
import * as userService from "../services/user.service.js";

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
  try {
    const id = Number(req.params.id);

    const user = await userService.getUserById(id);

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
