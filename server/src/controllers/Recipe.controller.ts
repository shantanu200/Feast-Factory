import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { PayloadRequest } from "../interfaces/User.Interface";
import {
  createComment,
  createRecipe,
  editRecipe,
  getRecipe,
  getRecipes,
  getAllCommnets,
  createReply,
  getReplies,
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
        handleRouteMessage(200, req.url);
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

export const createCommentOnRecipe = expressAsyncHandler(
  async (req: Request, res: Response) => {
    let id = req.params.id;
    const { error, data } = await createComment(id, req.body);

    if (error) {
      handleErrorMessage(res, 500, data);
    } else {
      handleRouteMessage(200, req.url);
      handleSuccessMessage(res, 200, data);
    }
  }
);

export const createReplyOnComment = expressAsyncHandler(
  async (req: Request, res: Response) => {
    let id = req.params.id;
    const { error, data } = await createReply(id, req.body);

    if (error) {
      handleErrorMessage(res, 500, data);
    } else {
      handleRouteMessage(200, req.url);
      handleSuccessMessage(res, 200, data);
    }
  }
);

export const getAllCommentsDOC = expressAsyncHandler(
  async (req: Request, res: Response) => {
    let id = req.params.id;

    const { count } = req.query;

    const { error, data } = await getAllCommnets(id, Number(count) || 3);

    if (error) {
      handleErrorMessage(res, 500, data);
    } else {
      handleRouteMessage(200, req.url);
      handleSuccessMessage(res, 200, data);
    }
  }
);

export const getAllRepliesDOC = expressAsyncHandler(
  async (req: Request, res: Response) => {
    let { id, commentID } = req.params;

    const { error, data } = await getReplies(id, commentID);

    if (error) {
      handleErrorMessage(res, 500, data);
    } else {
      handleRouteMessage(200, req.url);
      handleSuccessMessage(res, 200, data);
    }
  }
);
