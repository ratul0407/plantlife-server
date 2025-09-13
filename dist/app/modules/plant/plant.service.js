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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantService = void 0;
const plant_model_1 = require("./plant.model");
const plant_constants_1 = require("./plant.constants");
const queryBuilder_1 = require("../../utils/queryBuilder");
const createPlant = (plant) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(plant);
    const createdPlant = yield plant_model_1.Plant.create(plant);
    return createdPlant;
});
const getAllPlants = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryBuilder = new queryBuilder_1.QueryBuilder(plant_model_1.Plant.find(), query);
    console.log(query);
    const tours = yield queryBuilder
        .search(plant_constants_1.plantSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate();
    const [data, meta] = yield Promise.all([
        tours.build(),
        queryBuilder.getMeta(),
    ]);
    return {
        data,
        meta,
    };
});
const getSinglePlant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield plant_model_1.Plant.findById(id);
    return data;
});
exports.PlantService = {
    createPlant,
    getAllPlants,
    getSinglePlant,
};
