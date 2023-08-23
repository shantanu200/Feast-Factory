import { Document, Schema, Types, model, mongo } from "mongoose";

interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
  recipes: Types.Array<Types.ObjectId>;
}

const userSchema = new Schema<IUser>({
  userName: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  recipes: [{ type: Types.ObjectId, ref: "Recipe" }],
},{timestamps:true});

const User = model<IUser>("User", userSchema);

export default User;
