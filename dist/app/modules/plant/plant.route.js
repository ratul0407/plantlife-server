"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantRoutes = void 0;
const express_1 = require("express");
const plant_controller_1 = require("./plant.controller");
const multer_config_1 = require("../../config/multer.config");
const router = (0, express_1.Router)();
router.post("/add-plant", 
// checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
multer_config_1.multerUpload.array("files"), plant_controller_1.plantController.createPlant);
router.get("/all-plants", plant_controller_1.plantController.getAllPlants);
router.get("/:id", plant_controller_1.plantController.getSinglePlant);
exports.PlantRoutes = router;
