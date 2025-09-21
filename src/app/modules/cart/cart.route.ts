import { Router } from "express";
import { CartController } from "./cart.controller";

const router = Router();

router.post("/", CartController.addToCart);
router.get("/", CartController.getCart);
export const CartRoutes = router;
