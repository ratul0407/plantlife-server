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

router.get(
  "/my-wishlist",
  checkAuth(...Object.values(Role)),
  userController.myWishlist
);
router.patch(
  "/add-to-wishlist",
  checkAuth(...Object.values(Role)),
  userController.addToWishlist
);
router.patch(
  "/remove-from-wishlist",
  checkAuth(...Object.values(Role)),
  userController.removeFromWishlist
);
router.get(
  "/my-cart",
  checkAuth(...Object.values(Role)),
  userController.myCart
);
router.patch(
  "/add-to-cart",
  checkAuth(...Object.values(Role)),
  userController.addToCart
);
router.patch(
  "/remove-from-cart",
  checkAuth(...Object.values(Role)),
  userController.removeFromCart
);

router.patch(
  "/update-cart",
  checkAuth(...Object.values(Role)),
  userController.updateCart
);
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
router.get("/me", checkAuth(...Object.values(Role)), AuthController.getMe);

export const UserRoutes = router;
