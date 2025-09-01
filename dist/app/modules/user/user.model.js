"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const AuthProviderSchema = new mongoose_1.Schema({
    provider: {
        type: String,
        required: true,
    },
    providerId: {
        type: String,
        required: true,
    },
});
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    picture: { type: String },
    isVerified: { type: Boolean },
    isActive: {
        type: String,
        enum: Object.values(user_interface_1.IsActive),
        default: user_interface_1.IsActive.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false },
    wishlist: { type: [String], default: [] },
    coins: { type: Number, default: 0 },
    role: { type: String, enum: Object.values(user_interface_1.Role), default: user_interface_1.Role.USER },
    auths: [AuthProviderSchema],
    cart: { type: [mongoose_1.Schema.Types.ObjectId], ref: "Plants", default: [] },
    reviews: { type: [mongoose_1.Schema.Types.ObjectId], ref: "Reviews", default: [] },
    recentlyViewed: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "Plants",
        default: [],
    },
    questions: { type: [mongoose_1.Schema.Types.ObjectId], ref: "Questions", default: [] },
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
