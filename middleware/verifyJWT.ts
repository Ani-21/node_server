import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const verifyJWT: RequestHandler = (req, res, next) => {
  const authHeader = (req.headers["authorization"] ||
    req.headers["Authorization"]) as string;
  if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      // @ts-ignore
      req.username = decoded.username;
      next();
    }
  );
};
