import express, { Request, Response } from "express";
import { validUser } from "../middlewares/User.middleware";
import { createRecipeDoc } from "../controllers/Recipe.controller";
import multer from "multer";
import { uploadOnBucket } from "../services/ImageUpload";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.route("/:id").post(validUser, createRecipeDoc);

router.route("/abc").get(uploadOnBucket);
export default router;
