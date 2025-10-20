import { Router } from "express";

import { AnalyticsController } from "./analytics.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.get(
  "/user",
  checkAuth(...Object.values(Role)),
  AnalyticsController.userAnalytics
);

router.get(
  "/plant",
  checkAuth(Role.SUPER_ADMIN),
  AnalyticsController.PlantAnalytics
);

export const AnalyticRoutes = router;
