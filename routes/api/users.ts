import express from "express";
import { getUsers, getUser } from "../../controllers/usersController";
import {
  getFriends,
  addFriend,
  deleteFriend,
} from "../../controllers/friendsController";

const router = express.Router();

router.route("/").get(getUsers);

router.route("/:id").get(getUser);
router.route("/:id/friends").get(getFriends);
router.route("/:id/:friendId").patch(addFriend).delete(deleteFriend);

module.exports = router;
