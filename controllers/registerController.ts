import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User";

export const handleNewUser = async (req: Request, res: Response) => {
  const { username, password, city, age, university } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: "Требуется ввести логин и пароль" });

  const duplicate = await User.findOne({ username }).exec();

  if (duplicate)
    return res.status(409).json({ message: "Пользователь уже существует" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      city,
      age,
      university,
    });

    const accessToken = jwt.sign(
      { username: username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10d" }
    );

    res
      .status(201)
      .json({
        success: `Создан новый пользователь ${user}`,
        accessToken,
        userId: user._id,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
