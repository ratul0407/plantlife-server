import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { addToCartZodSchema } from "./cart.validation";
import { CartController } from "./cart.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/get-cart", CartController.getCartPlants);
router.post(
  "/add-to-cart",
  checkAuth(...Object.values(Role)),
  validateRequest(addToCartZodSchema),
  CartController.addToCart
);

export const CartRoutes = router;
