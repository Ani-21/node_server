import express from "express";
import { handleLogin } from "../controllers/authController";

const route = express.Router();

route.post("/", handleLogin);

module.exports = route;
