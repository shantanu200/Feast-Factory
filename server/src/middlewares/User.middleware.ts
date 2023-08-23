import User from "../model/User";
import { NextFunction, Response, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const validUser = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ status: false, msg: "Unauthorized token" });
  }

  const stoken = token.split(" ")[1];

  try {
    const decodedToken = jwt.verify(
      stoken,
      process.env.JWTSECRET
    ) as JwtPayload;

    const userInfo = await User.findById(decodedToken?._id);

    req.user = userInfo;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, msg: "Invalid Token is passed" });
  }
};
