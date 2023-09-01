import mongoose, { Types, Document, Schema, model } from "mongoose";

interface reply {
  _id: string;
  author: Types.ObjectId;
  comment: string;
  timeStamp: string;
}

interface Comment {
  author: Types.ObjectId;
  comment: string;
  replies: reply[];
  timeStamp: String;
}

interface IRecipe extends Document {
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  imageUrl: string[];
  author: Types.ObjectId;
  comments: Comment[];
  rating: number;
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
        // required: true,
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: [
      {
        author: { type: Schema.Types.ObjectId, ref: "User" },
        comment: String,
        replies: [
          {
            _id: {
              type: String,
            },
            author: { type: Schema.Types.ObjectId, ref: "User" },
            comment: {
              type: String,
            },
            timeStamp: {
              type: Date,
              default: Date.now(),
            },
          },
        ],
        timeStamp: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Recipe = model<IRecipe>("Recipe", recipeSchema);

export default Recipe;
