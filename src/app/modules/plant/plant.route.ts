import { Router } from "express";
import { plantController } from "./plant.controller";

import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post(
  "/add-plant",
  // checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  multerUpload.array("files"),
  plantController.createPlant
);

router.get("/my-wishlist", plantController.myWishlistPlant);
router.get("/all-plants", plantController.getAllPlants);
router.get("/:id", plantController.getSinglePlant);
export const PlantRoutes = router;
