import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { PayloadRequest } from "../interfaces/User.Interface";
import {
  createRecipe,
  editRecipe,
  getRecipe,
  getRecipes,
} from "../mongo/Recipe.mongo";
import {
  handleErrorMessage,
  handleSuccessMessage,
} from "../utils/StatusMessage";
import { handleRouteMessage } from "../utils/Message";

export const createRecipeDoc = expressAsyncHandler(
  async (req: PayloadRequest, res: Response) => {
    if (req.user) {
      let id = req.params.id;

      const { error, data } = await createRecipe(id, req.body);

      if (error) {
        handleErrorMessage(res, 400, null);
      } else {
        handleRouteMessage(200,req.url);
        handleSuccessMessage(res, 200, data);
      }
    }
  }
);

export const getRecipeDoc = expressAsyncHandler(
  async (req: PayloadRequest, res: Response) => {
    if (req.user) {
      let id = req.params.id;

      const { error, data } = await getRecipe(id);

      if (error) {
        handleErrorMessage(res, 400, null);
      } else {
        handleRouteMessage(200, req.url);
        handleSuccessMessage(res, 200, data);
      }
    }
  }
);

export const editRecipeDoc = expressAsyncHandler(
  async (req: PayloadRequest, res: Response) => {
    if (req.user) {
      let id = req.params.id;

      const { error, data } = await editRecipe(id, req.body);

      if (error) {
        handleErrorMessage(res, 400, null);
      } else {
        handleRouteMessage(200, req.url);
        handleSuccessMessage(res, 200, data);
      }
    }
  }
);

export const getAllRecipes = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { page, limit, search } = req.query;
    const { error, data } = await getRecipes(
      Number(page) || 1,
      Number(limit) || 10,
      String(search) || ""
    );
    if (error) {
      handleErrorMessage(res, 400, data);
    } else {
      handleRouteMessage(200, req.url);
      handleSuccessMessage(res, 200, data);
    }
  }
);
