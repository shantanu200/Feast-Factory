import { Types } from "mongoose";
import User from "../model/User";
import { IRUser } from "../interfaces/User.Interface";
import { generateToken } from "../services/WebToken";

export async function createUser(data: IRUser) {
  try {
    const existUser = await User.findOne({
      $or: [{ userName: data.userName }, { email: data.email }],
    });

    if (existUser && existUser._id) {
      if (existUser.password === data.password) {
        return {
          error: false,
          data: {
            _id: existUser._id,
            userName: existUser.userName,
            email: existUser.email,
            token: generateToken(existUser._id),
          },
        };
      } else {
        return {
          error: true,
          data: "Please check password",
        };
      }
    } else {
      const user = await User.create({
        userName: data.userName,
        password: data.password,
        email: data.email,
      });

      if (user && user._id) {
        return {
          error: false,
          data: {
            _id: user._id,
            userName: user.userName,
            password: user.password,
            email: user.email,
            token: generateToken(user._id),
          },
        };
      }
    }
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}

export async function getUserByID(id: string) {
  try {
    const user = await User.findById(id).populate("recipes");

    if (user && user._id) {
      return {
        error: false,
        data: user,
      };
    }
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}

export async function updateUser(id: string, data: Partial<IRUser>) {
  try {
    const user = await User.findByIdAndUpdate(id, data, { new: true });

    if (user && user._id) {
      return {
        error: false,
        data: user,
      };
    }
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}

export async function userRecipes(id: string) {
  try {
    const user = await User.findById(id).populate("recipes").select("recipes");

    if (user && user._id) {
      return {
        error: false,
        data: user,
      };
    }
  } catch (error) {
    return {
      error: true,
      data: error,
    };
  }
}
