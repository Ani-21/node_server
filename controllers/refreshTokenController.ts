import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req?.cookies;

  if (!cookies?.jwt) return res.sendStatus(401).json({ msg: "Нет кук" });

  const refreshToken = cookies?.refreshToken;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      if (err) return res.sendStatus(401);

      const accessToken = jwt.sign(
        {
          UserInfo: { username: decoded.username },
        },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "15m" }
      );
      res.json({ accessToken });
    }
  );
};
