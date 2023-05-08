import { Request, Response } from "express";
import User from "../models/User";

export const handleLogout = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  try {
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
      res.clearCookie("jwt", { httpOnly: true });
      res.sendStatus(204);
    }

    if (foundUser === null) {
      res.json({ message: "Нет такого пользователя" });
    } else {
      foundUser.refreshToken = "";
      return await foundUser.save();
    }

    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    res.sendStatus(204);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
