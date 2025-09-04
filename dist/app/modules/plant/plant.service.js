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
const createPlant = (plant) => __awaiter(void 0, void 0, void 0, function* () { });
const getAllPlants = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield plant_model_1.Plant.aggregate([
        {
            $project: {
                name: 1,
                price: "$basePrice",
                img: {
                    $let: {
                        vars: {
                            matchedVariant: {
                                $first: {
                                    $filter: {
                                        input: "$variants",
                                        as: "variant",
                                        cond: { $eq: ["$$variant.id", "$defaultVariant"] },
                                    },
                                },
                            },
                        },
                        in: "$$matchedVariant.img",
                    },
                },
                second_img: {
                    $let: {
                        vars: {
                            otherVariants: {
                                $filter: {
                                    input: "$variants",
                                    as: "variant",
                                    cond: { $ne: ["$$variant.id", "$defaultVariant"] },
                                },
                            },
                        },
                        in: {
                            $cond: {
                                if: { $gt: [{ $size: "$$otherVariants" }, 0] },
                                then: { $first: "$$otherVariants.img" },
                                else: { $arrayElemAt: ["$more_images", 0] },
                            },
                        },
                    },
                },
            },
        },
    ]);
    return data;
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
