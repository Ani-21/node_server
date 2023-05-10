import { Request, Response } from "express";
import User from "../models/User";

interface IFriend {
  _id: string;
  username: string;
  university: string;
}

export const getFriends = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id) return res.json({ message: "Пользователь не найден" });

  try {
    const foundUser = await User.findById(id);

    const friends = await Promise.all(
      // @ts-ignore
      foundUser?.friends.map((id) => User.findById(id))
    );

    const formattedFriends: IFriend[] = friends?.map(
      // @ts-ignore
      ({ _id, username, university }: IFriend) => ({
        _id,
        username,
        university,
      })
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addFriend = async (req: Request, res: Response) => {
  const { id, friendId } = req.params;

  if (id === friendId)
    return res
      .status(409)
      .json({ message: "Вы не можете добавить в друзья самого себя" });

  const user = await User.findById(id);
  const friend = await User.findById(friendId);

  if (!user?.friends.includes(friendId)) {
    user?.friends.push(friendId);
    friend?.friends.push(id);
  }

  await user?.save();
  await friend?.save();

  const friends = await Promise.all(
    // @ts-ignore
    user?.friends.map((id) => User.findById(id))
  );

  // @ts-ignore
  const formattedFriends = friends.map(({ _id, username, university }) => ({
    _id,
    username,
    university,
  }));

  res.status(200).json(formattedFriends);
};

export const deleteFriend = async (req: Request, res: Response) => {
  const { userId, friendId } = req.params;

  if (userId === friendId)
    return res.json({ message: "Вы не можете удалить из списка самого себя" });

  const user = await User.findById(userId);
  const friend = await User.findById(friendId);

  if (user?.friends.includes(friendId)) {
    // @ts-ignore
    user?.friends = user?.friends.filter((id) => id !== friendId);
    // @ts-ignore
    friend?.friends = friend?.friends.filter((id) => id !== userId);
  }

  await user?.save();
  await friend?.save();

  const friends = await Promise.all(
    // @ts-ignore
    user?.friends.map((id) => User.findById(id))
  );

  res.json(friends);
};
