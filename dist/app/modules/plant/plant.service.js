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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlantService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = require("../user/user.model");
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
    // const meta = await queryBuilder.getMeta();
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
const myWishlistPlant = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const plants = await User.aggregate([
    //   { $match: { _id: id } },
    // { $unwind: "$wishlist" }, // break array into objects
    // {
    //   $lookup: {
    //     from: "plants",
    //     localField: "wishlist.plant",
    //     foreignField: "_id",
    //     as: "wishlist.plantDetails",
    //   },
    // },
    // { $unwind: "$wishlist.plantDetails" }, // flatten plant details
    // {
    //   $group: {
    //     _id: "$_id",
    //     wishlist: { $push: "$wishlist" },
    //   },
    // },
    // ]);
    // console.log(plants);
    const userPlants = yield user_model_1.User.aggregate([
        { $match: { _id: new mongoose_1.default.Types.ObjectId(id) } },
        { $unwind: "$wishlist" },
        {
            $lookup: {
                from: "plants",
                localField: "wishlist.plant",
                foreignField: "_id",
                as: "wishlist.plantDetails",
            },
        },
        { $unwind: "$wishlist.plantDetails" }, // flatten plant details
        {
            $group: {
                _id: "$_id",
                wishlist: { $push: "$wishlist" },
            },
        },
    ]);
    return userPlants;
});
const removeFromWishlist = (userId, plant) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.User.findByIdAndUpdate(userId, {
        $pull: { wishlist: { plant: plant } },
    });
});
exports.PlantService = {
    createPlant,
    getAllPlants,
    getSinglePlant,
    myWishlistPlant,
    removeFromWishlist,
};
