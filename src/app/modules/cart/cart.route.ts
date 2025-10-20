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

router.post(
  "/update-quantity",
  checkAuth(...Object.values(Role)),
  CartController.updateQuantity
);

router.delete(
  "/delete-item",
  checkAuth(...Object.values(Role)),
  CartController.deleteCartItem
);

router.delete(
  "/delete-cart",
  checkAuth(...Object.values(Role)),
  CartConitroller.deleteCart
);
export const CartRoutes = router;
