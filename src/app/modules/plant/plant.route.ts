import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { plantController } from "./plant.controller";

const router = Router();

router.post(
  "/create-plant",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  plantController.createPlant
);

router.get("/all-plants", checkAuth(Role.ADMIN, Role.SUPER_ADMIN));
router.get("/plant/:slug", checkAuth(...Object.values(Role)));
export const PlantRoutes = router;
