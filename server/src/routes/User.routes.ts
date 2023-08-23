import { validUser } from "../middlewares/User.middleware";
import { createUserDoc, editUser, fetchUser } from "../controllers/User.controller";
import express from "express";

const router = express.Router();

router.route("/").post(createUserDoc);

router.route("/:id").get(fetchUser);

router.route("/edit/:id").put(validUser,editUser);

export default router;
