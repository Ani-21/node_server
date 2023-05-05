import { RequestHandler } from "express";
import { allowedOrigins } from "../config/allowedOrigins";

export const credentials: RequestHandler = (req, res, next) => {
  const origin = req.headers.origin as string;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }
  next();
};
