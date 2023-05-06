import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";

export const handleLogin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ msg: "Требуется ввести логин и пароль" });

  const foundUser = await User.findOne({ username }).exec();

  if (!foundUser)
    return res.status(401).json({ msg: "Пользователь не найден" });

  try {
    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      const accessToken = jwt.sign(
        { username: foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" }
      );

      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "21d" }
      );

      foundUser.refreshToken = refreshToken;

      const result = await foundUser.save();

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
