import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.JWTSECRET, {
    expiresIn: "7d",
  });
};
