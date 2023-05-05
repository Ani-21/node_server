import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";

export const handleNewUser = async (req: Request, res: Response) => {
  const { username, password, city, age, university } = req.body;

  if (!username || !password)
    return res.status(400).json({ msg: "Требуется ввести логин и пароль" });

  const duplicate = await User.findOne({ username }).exec();

  if (duplicate)
    return res.status(409).json({ msg: "Пользователь уже существует" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      username,
      password: hashedPassword,
      city,
      age,
      university,
    });

    console.log(result);

    res.status(201).json({ success: `Создан новый пользователь ${username}` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
