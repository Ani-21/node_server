import express from "express";
import { verifyJWT } from "../../middleware/verifyJWT";
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../../controllers/postsController";

const router = express.Router();

router.route("/").get(getPosts).post(createPost);

router.route("/:id").get(getPost).patch(updatePost).delete(deletePost);

router.route("/:id/likePost").patch(likePost);

module.exports = router;
