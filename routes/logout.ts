import express from "express";
import { handleLogout } from "../controllers/logoutController";

const route = express.Router();

route.post("/", handleLogout);

module.exports = route;
