import { Types } from "mongoose";
import User from "../model/User";
import { IRUser } from "../interfaces/User.Interface";
import { generateToken } from "../services/WebToken";

export async function createUser(data: IRUser) {
  try {
    const user = await User.create({
      userName: data.userName,
      password: data.password,
      email: data.email,
    });

    if (user && user._id) {
      return {
        error: false,
        data: {
          userName: user.userName,
          password: user.password,
          email: user.email,
          token: generateToken(user._id),
        },
      };
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
    const user = await User.findById(id);

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
