import { Request, Response } from "express";
import mongoose from "mongoose";
import Post from "../models/Post";

const checkId = (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) return res.status(404).send("Необходимо передать id");

  return id;
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getPost = async (req: Request, res: Response) => {
  const id = checkId(req, res);
  try {
    const foundPost = await Post.findById(id);
    res.status(200).json(foundPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  if (!req?.body?.text || !req?.body?.username) {
    return res
      .status(400)
      .json({ message: "Необходимо ввести текст и имя пользователя" });
  }

  const { username, text, tags, selectedFile } = req.body;

  try {
    const newPost = await Post.create({
      username,
      text,
      tags,
      selectedFile,
    });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const id = checkId(req, res);
  const { username, text, selectedFile } = req.body;

  const foundPost = await Post.findOne({ _id: id }).exec();

  if (!foundPost)
    res.status(404).send(`Пост пользователя с именем ${username} не найден`);

  if (req.body?.text) foundPost.text = req.body.text;
  if (req.body?.selectedFile) foundPost.selectedFile = req.body.selectedFile;
  const result = await foundPost.save();
  res.json(result);
};

export const deletePost = async (req: Request, res: Response) => {
  const id = checkId(req, res);

  await Post.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req: Request, res: Response) => {
  const { id } = req.params;

  const foundPost = await Post.findById(id);

  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { likeCount: foundPost.likeCount + 1 },
    { new: true }
  );

  res.json(updatedPost.likeCount);
};
