import { Router } from "express";
import { userController } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";

import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
import { AuthController } from "../auth/auth.controller";
const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userController.createUser
);

router.get("/me", checkAuth(...Object.values(Role)), AuthController.getMe);

router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  userController.getAllUsers
);
router.patch(
  "/:id",
  validateRequest(updateUserZodSchema),
  userController.updateUser
);

export const UserRoutes = router;
