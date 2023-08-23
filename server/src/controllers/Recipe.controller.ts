import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { PayloadRequest } from "../interfaces/User.Interface";
import { createRecipe } from "../mongo/Recipe.mongo";
import { handleErrorMessage, handleSuccessMessage } from "../utils/StatusMessage";
import { handleRouteMessage } from "../utils/Message";

export const createRecipeDoc = expressAsyncHandler(
  async (req: PayloadRequest, res: Response) => {
    if (req.user) {
      let id = req.params.id;

      const { error, data } = await createRecipe(id, req.body);

      if (error) {
        handleErrorMessage(res, 400, null);
      }else{
        handleRouteMessage(200,`/recipe/${id}`);
        handleSuccessMessage(res,200,data);
      }
    }
  }
);
