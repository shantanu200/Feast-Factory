import express, { Request, Response } from "express";
import { validUser } from "../middlewares/User.middleware";
import {
  createRecipeDoc,
  editRecipeDoc,
  getAllRecipes,
  getRecipeDoc,
} from "../controllers/Recipe.controller";
import multer from "multer";
import { uploadOnBucket } from "../services/ImageUpload";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router
  .route("/uploadImages")
  .post(validUser, upload.array("images", 5), uploadOnBucket);

router.route("/create/:id").post(validUser, createRecipeDoc);

router.route("/getRecipe/:id").get(validUser, getRecipeDoc);

router.route("/editRecipe/:id").put(validUser, editRecipeDoc);

router.route("/recipes").get(getAllRecipes);
export default router;
