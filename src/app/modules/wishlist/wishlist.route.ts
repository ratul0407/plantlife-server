import { Router } from "express";
import { wishlistController } from "./wishlist.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

//get user wishlist
router.get(
  "/user",
  checkAuth(...Object.values(Role)),
  wishlistController.getUserWishlist
);

// get local wishlist plant
router.post("/local", wishlistController.getLocalWishlist);

// add to wishlist
router.post(
  "/add",
  checkAuth(...Object.values(Role)),
  wishlistController.addToWishlist
);

//delete from wishlist
router.delete(
  "/delete",
  checkAuth(...Object.values(Role)),
  wishlistController.deleteWishlist
);

//merge wishlist
router.post(
  "/merge",
  checkAuth(...Object.values(Role)),
  wishlistController.mergeWishlist
);
export const WishlistRoutes = router;
