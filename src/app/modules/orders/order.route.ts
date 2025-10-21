import { Router } from "express";
import { OrderController } from "./order.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.get("/", checkAuth(...Object.values(Role)), OrderController.getOrder);
router.post(
  "/",
  checkAuth(...Object.values(Role)),
  OrderController.createOrder
);
export const OrderRoutes = router;
