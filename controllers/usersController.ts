import { Request, Response } from "express";
import User from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await User.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.json({ message: "Требуется ввести имя" });
  try {
    const foundUser = await User.findById(id);
    if (!foundUser) res.json({ message: "Пользователь не наден" });
    return res.status(200).json(foundUser);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
