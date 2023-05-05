import express from "express";
import { handleRefreshToken } from "../controllers/refreshTokenController";

const route = express.Router();

route.get("/", handleRefreshToken);

module.exports = route;
