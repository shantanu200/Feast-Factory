import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRoutes from "./routes/User.routes";
import RecipeRoutes from "./routes/Recipe.routes";
import { handleRouteMessage } from "./utils/Message";
import { handleSuccessMessage } from "./utils/StatusMessage";
import { connectionDatabase } from "./config/mongoDbConn";
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/** Entry API endPoint */
app.get("/", (req: Request, res: Response) => {
  handleRouteMessage(200, "/");
  handleSuccessMessage(res, 200, null);
});

app.use("/user", UserRoutes);
app.use("/recipe", RecipeRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  connectionDatabase();
  console.log(`[App]: Server is running on ${PORT}`);
});
