import { Router } from "express";
import { wishlistController } from "./wishilst.controller";

const router = Router();

router.post("/", wishlistController.addToWishlist);
export const wishlistRoutes = router;
