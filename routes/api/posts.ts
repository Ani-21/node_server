import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} from "../../controllers/postsController";

const router = express.Router();

router.route("/").get(getPosts).post(createPost);

router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

module.exports = router;
