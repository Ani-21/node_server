import express from "express";
import { getUsers } from "../../controllers/usersController";

const router = express.Router();

router.route("/").get(getUsers);

module.exports = router;
