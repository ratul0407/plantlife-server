import express, { Request, Response } from "express";

import cors from "cors";
import router from "./app/routes";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import Notfound from "./app/middlewares/notFound";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to PlantLife Backend",
  });
});

app.use(globalErrorHandler);
app.use(Notfound);
export default app;
