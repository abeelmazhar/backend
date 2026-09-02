import { Request, Response } from "express";

export const uploadFile = (req: Request, res: Response) => {
  console.log(req.file);

  res.status(201).json({
    message: "File uploaded successfully",
    file: req.file,
  });
};
