import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";
import { PlantRoutes } from "../modules/plant/plant.route";
import { CartRoutes } from "../modules/cart/cart.route";
import { WishlistRoutes } from "../modules/wishlist/wishlist.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    routes: UserRoutes,
  },
  {
    path: "/auth",
    routes: authRoutes,
  },
  {
    path: "/plant",
    routes: PlantRoutes,
  },
  {
    path: "/cart",
    routes: CartRoutes,
  },
  {
    path: "/wishlist",
    routes: WishlistRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
