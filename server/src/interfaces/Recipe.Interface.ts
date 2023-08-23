import { Types } from "mongoose";

export interface IReciepe {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  imageUrl: string[];
  author: Types.ObjectId;
}
