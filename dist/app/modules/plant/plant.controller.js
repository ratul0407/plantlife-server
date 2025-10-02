"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.plantController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const plant_service_1 = require("./plant.service");
const createPlant = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = req.body, { variants } = _a, rest = __rest(_a, ["variants"]);
    const parsedVariants = JSON.parse(variants);
    const images = (req.files["images"] || []).map((f) => f.path);
    const variantImages = (req.files["variantImages"] || []).map((f) => f.path);
    const updatedVariants = parsedVariants === null || parsedVariants === void 0 ? void 0 : parsedVariants.map((item, index) => (Object.assign(Object.assign({}, item), { inStock: (item === null || item === void 0 ? void 0 : item.stock) > 0 ? true : false, image: variantImages[index], sku: `PLANT-${item.variantName.split(" ").join("-")}-${Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase()}-${index}` })));
    const payload = Object.assign(Object.assign({}, rest), { variants: updatedVariants, additionalImages: images });
    const result = yield plant_service_1.PlantService.createPlant(payload);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Plant created successfully!",
        success: true,
        data: result,
    });
}));
const getAllPlants = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    const result = yield plant_service_1.PlantService.getAllPlants(query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Plants retrieved successfully!",
        success: true,
        data: result,
    });
}));
const getSinglePlant = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield plant_service_1.PlantService.getSinglePlant(id);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Plant created successfully!",
        success: true,
        data: result,
    });
}));
const getLocalCartPlants = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { plants } = req.body;
    const result = yield plant_service_1.PlantService.getLocalCartPlants(plants);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Plant created successfully!",
        success: true,
        data: result,
    });
}));
exports.plantController = {
    createPlant,
    getAllPlants,
    getSinglePlant,
    getLocalCartPlants,
};
