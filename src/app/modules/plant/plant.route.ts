import { Router } from "express";
import { plantController } from "./plant.controller";

import { multerUpload } from "../../config/multer.config";
import { Role } from "../user/user.interface";
import { checkAuth } from "../../middlewares/checkAuth";

const router = Router();

router.post(
  "/add-plants",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.fields([{ name: "images" }, { name: "variantImages" }]),
  plantController.createPlant
);
router.post("/get-local-cart-plants", plantController.getLocalCartPlants);
router.get("/all-plants", plantController.getAllPlants);
router.get("/:id", plantController.getSinglePlant);
export const PlantRoutes = router;
