import { Response, Request } from "express";
import { createUser, getUserByID, updateUser, userRecipes } from "../mongo/User.mongo";
import expressAsyncHandler from "express-async-handler";
import {
  handleErrorMessage,
  handleSuccessMessage,
} from "../utils/StatusMessage";
import { handleRouteMessage } from "../utils/Message";
import { PayloadRequest } from "../interfaces/User.Interface";

export const createUserDoc = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { error, data } = await createUser(req.body);
    if (error) {
      handleErrorMessage(res, 400, data);
    } else {
      handleRouteMessage(201, "/user");
      handleSuccessMessage(res, 201, data);
    }
  }
);

export const fetchUser = expressAsyncHandler(
  async (req: Request, res: Response) => {
    let id = req.params.id;

    const { error, data } = await getUserByID(id);

    if (error) {
      handleErrorMessage(res, 400, data);
    } else {
      handleRouteMessage(200, `/user/${id}`);
      handleSuccessMessage(res, 200, data);
    }
  }
);

export const editUser = expressAsyncHandler(
  async (req: PayloadRequest, res: Response) => {
    let id = req.params.id;

    if (req.user) {
      const { error, data } = await updateUser(id,req.body);
      if (error) {
        handleErrorMessage(res, 400, data);
      } else {
        handleRouteMessage(200, `/user/${id}`);
        handleSuccessMessage(res, 200, data);
      }
    } else {
      return;
    }
  }
);

export const getUserRecipeDocs = expressAsyncHandler(
  async (req: PayloadRequest, res: Response) => {
    let id = req.params.id;

    if (req.user) {
      const { error, data } = await userRecipes(id);
      if (error) {
        handleErrorMessage(res, 400, data);
      } else {
        handleRouteMessage(200, `/user/${id}`);
        handleSuccessMessage(res, 200, data);
      }
    } else {
      return;
    }
  }
);