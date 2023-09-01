import express, { Request, Response } from "express";
import { validUser } from "../middlewares/User.middleware";
import {
  createCommentOnRecipe,
  createRecipeDoc,
  createReplyOnComment,
  editRecipeDoc,
  getAllCommentsDOC,
  getAllRecipes,
  getAllRepliesDOC,
  getRecipeDoc,
} from "../controllers/Recipe.controller";
import multer from "multer";
import { uploadOnBucket } from "../services/ImageUpload";

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.route("/create/:id").post(validUser, createRecipeDoc);

router
  .route("/uploadImages")
  .post(validUser, upload.array("images", 5), uploadOnBucket);

router.route("/getRecipe/:id").get(validUser, getRecipeDoc);

router.route("/reply/:id/:commentID").get(getAllRepliesDOC);

router.route("/editRecipe/:id").put(validUser, editRecipeDoc);

router.route("/recipes").get(getAllRecipes);

router.route("/comment/:id").post(createCommentOnRecipe).get(getAllCommentsDOC);

router.route("/reply/:id").post(createReplyOnComment);

export default router;
