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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("../../config/env");
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const userTokens_1 = require("../../utils/userTokens");
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload, rest = __rest(payload, ["email", "password"]);
    const hashedPassword = yield bcryptjs_1.default.hash(password, Number(env_1.envVars.BCRYPT_SALT_ROUND));
    const authProvider = {
        provider: "credentials",
        providerId: email,
    };
    const user = yield user_model_1.User.create(Object.assign({ email, password: hashedPassword, auths: [authProvider] }, rest));
    const { accessToken, refreshToken } = (0, userTokens_1.createUserTokens)(user);
    return {
        user,
        accessToken,
        refreshToken,
    };
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return user_model_1.User.find({});
});
const updateUser = (id, payload, decodedToken) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.User.findById(id);
    if (!isUserExists) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User does not exist");
    }
    if (payload.role) {
        if (decodedToken.role === user_interface_1.Role.USER || decodedToken.role === user_interface_1.Role.STAFF) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not authorized");
        }
        if (payload.role === user_interface_1.Role.SUPER_ADMIN && decodedToken.role === user_interface_1.Role.ADMIN) {
            throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "You are not authorized");
        }
    }
    if (payload.password) {
        payload.password = yield bcryptjs_1.default.hash(payload.password, env_1.envVars.BCRYPT_SALT_ROUND);
    }
    const newUpdatedUser = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return newUpdatedUser;
});
const getMe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findById(id).select("-password");
    return user;
});
const addToWishlist = (id, plant) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.User.findById(id);
    const plantExists = (_a = user === null || user === void 0 ? void 0 : user.wishlist) === null || _a === void 0 ? void 0 : _a.some((item) => item.plant.toString() === plant);
    if (plantExists) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Plant is already in wishlist");
    }
    const updatedUser = user_model_1.User.findOneAndUpdate({ _id: id }, {
        $push: {
            wishlist: {
                plant,
            },
        },
    }, { runValidators: true, new: true });
    return updatedUser;
});
const removeFromWishlist = (id, plant) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield user_model_1.User.findById(id);
    const plantExists = (_a = user === null || user === void 0 ? void 0 : user.wishlist) === null || _a === void 0 ? void 0 : _a.some((item) => item.plant.toString() === plant);
    if (plantExists) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Plant is already in wishlist");
    }
    const updatedUser = user_model_1.User.findOneAndUpdate({ _id: id }, {
        $pop: {
            wishlist: {
                plant,
            },
        },
    }, { runValidators: true, new: true });
    return updatedUser;
});
const addToCart = (id, plant, quantity, sku) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const user = yield user_model_1.User.findById(id);
    const sameSku = (_a = user === null || user === void 0 ? void 0 : user.cart) === null || _a === void 0 ? void 0 : _a.some((item) => item.sku === sku);
    if (sameSku) {
        const quantity = (_c = (_b = user === null || user === void 0 ? void 0 : user.cart) === null || _b === void 0 ? void 0 : _b.find((item) => item.sku === sku)) === null || _c === void 0 ? void 0 : _c.quantity;
        if (quantity) {
            return updateCart(id, sku, quantity + 1);
        }
    }
    const updatedUser = user_model_1.User.findOneAndUpdate({ _id: id }, {
        $push: {
            cart: {
                plant,
                quantity,
                sku,
            },
        },
    }, { runValidators: true, new: true });
    return updatedUser;
});
const myCart = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const userPlants = yield user_model_1.User.aggregate([
        { $match: { _id: new mongoose_1.default.Types.ObjectId(id) } },
        { $unwind: "$cart" },
        {
            $lookup: {
                from: "plants",
                localField: "cart.plant",
                foreignField: "_id",
                as: "cart.plantDetails",
            },
        },
        { $unwind: "$cart.plantDetails" }, // flatten plant details
        {
            $group: {
                _id: "$_id",
                cart: { $push: "$cart" },
            },
        },
    ]);
    return userPlants;
});
const updateCart = (user, sku, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("I was here");
    const updatedUser = user_model_1.User.findByIdAndUpdate(user, {
        $set: {
            "cart.$[item].quantity": quantity,
        },
    }, {
        new: true,
        arrayFilters: [{ "item.sku": sku }],
    });
    console.log(updatedUser);
    return updatedUser;
});
const removeFromCart = (id, sku) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = user_model_1.User.findOneAndUpdate({ _id: id }, {
        $pull: {
            cart: {
                sku: sku,
            },
        },
    }, { runValidators: true, new: true });
    return updatedUser;
});
exports.userServices = {
    createUser,
    getMe,
    getAllUsers,
    updateUser,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    myCart,
    updateCart,
    removeFromCart,
};
