import { validUser } from "../middlewares/User.middleware";
import { createUserDoc, editUser, fetchUser, getUserRecipeDocs } from "../controllers/User.controller";
import express from "express";

const router = express.Router();

router.route("/").post(createUserDoc);

router.route("/:id").get(fetchUser);

router.route("/edit/:id").put(validUser,editUser);

router.route("/recipes/:id").get(validUser,getUserRecipeDocs);

export default router;
