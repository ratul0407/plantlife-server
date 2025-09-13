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
exports.userController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const user_service_1 = require("./user.service");
const sendResponse_1 = require("../../utils/sendResponse");
const createUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.createUser(req.body);
    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: false,
    });
    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
    });
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "User created successfully!",
        data: result,
    });
}));
const getAllUsers = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userServices.getAllUsers();
    (0, sendResponse_1.sendResponse)(res, {
        success: true,
        statusCode: 201,
        message: "All users retrieved successfully!",
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const token = req.user;
    const result = yield user_service_1.userServices.updateUser(id, req.body, token);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Updated User successfully!",
        data: result,
    });
}));
const addToWishlist = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { plant } = req.body;
    console.log(userId);
    console.log("I was here");
    const result = yield user_service_1.userServices.addToWishlist(userId, plant);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Added to wishlist",
        data: result,
    });
}));
const removeFromWishlist = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { plant } = req.body;
    const result = yield user_service_1.userServices.removeFromWishlist(userId, plant);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Added to wishlist",
        data: result,
    });
}));
const addToCart = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { plant, quantity, sku } = req.body;
    console.log(req.body);
    const result = yield user_service_1.userServices.addToCart(userId, plant, quantity, sku);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Added to Cart",
        data: result,
    });
}));
const myCart = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    console.log(userId);
    const result = yield user_service_1.userServices.myCart(userId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Cart retrieved successfully!",
        success: true,
        data: result,
    });
}));
const updateCart = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity, sku } = req.body;
    const { userId } = req.user;
    const result = yield user_service_1.userServices.updateCart(userId, sku, quantity);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        message: "Cart updated successfully!",
        success: true,
        data: result,
    });
}));
const removeFromCart = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const { sku } = req.body;
    const result = yield user_service_1.userServices.removeFromCart(userId, sku);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Removed from cart",
        data: result,
    });
}));
exports.userController = {
    createUser,
    getAllUsers,
    updateUser,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    myCart,
    updateCart,
    removeFromCart,
};
