import { Request, Response } from "express";

import * as orderService from "../services/order.service.js";
import * as userService from "../services/user.service.js";
import { AppError } from "../errors/app.error.js";

export const getUserOrders = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const user = await userService.getUserById(id);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const orders = await orderService.getOrdersByUserId(id);

  res.status(200).json({
    orders,
  });
};
