import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { authRoutes } from "../modules/auth/auth.route";

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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
