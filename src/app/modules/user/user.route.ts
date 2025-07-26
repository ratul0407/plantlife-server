import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userController.createUser
);
router.post("/login", userController.credentialsLogin);
export const UserRoutes = router;
