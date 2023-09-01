import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
export interface IRUser {
  userName: string;
  email: string;
  password: string;
}

export interface PayloadRequest extends Request {
  user?: JwtPayload;
}

export interface Comment {
  author: string;
  comment: string;
}
