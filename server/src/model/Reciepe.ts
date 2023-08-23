import mongoose, { Types, Document, Schema, model } from "mongoose";

interface IRecipe extends Document {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  imageUrl: string[];
  autor: Types.ObjectId;
}

const recipeSchema = new Schema<IRecipe>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    steps: [
      {
        type: String,
        required: true,
      },
    ],
    imageUrl: [
      {
        type: String,
        required: true,
      },
    ],
    autor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Recipe = model<IRecipe>("Recipe", recipeSchema);

export default Recipe;
