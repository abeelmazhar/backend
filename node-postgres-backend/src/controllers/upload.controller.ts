import { Request, Response } from "express";

export const uploadFile = (req: Request, res: Response) => {
  console.log(req.file);

  res.status(201).json({
    message: "File uploaded successfully",
    file: req.file,
  });
};

export const uploadProductImages = (req: Request, res: Response) => {
  const files = req.files as Express.Multer.File[];

  res.status(201).json({
    message: "Images uploaded",
    files,
  });
};
