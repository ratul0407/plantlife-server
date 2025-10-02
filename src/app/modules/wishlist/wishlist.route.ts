import { Router } from "express";
import { wishlistController } from "./wishlist.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.get(
  "/user",
  checkAuth(...Object.values(Role)),
  wishlistController.getUserWishlist
);
router.post("/local", wishlistController.getLocalWishlist);
router.post(
  "/add",
  checkAuth(...Object.values(Role)),
  wishlistController.addToWishlist
);

router.delete(
  "/delete",
  checkAuth(...Object.values(Role)),
  wishlistController.deleteWishlist
);
router.post(
  "/merge",
  checkAuth(...Object.values(Role)),
  wishlistController.mergeWishlist
);
export const WishlistRoutes = router;
