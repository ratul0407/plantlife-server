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
}, { _id: false, timestamps: true, versionKey: false });
const addressSchema = new mongoose_1.Schema({
    division: { type: String, enum: Object.values(user_interface_1.Division), required: true },
    district: { type: String, required: true },
    subDistrict: { type: String, required: true },
    zip: { type: Number, required: true },
    streetAddress: { type: String, required: true },
}, {
    versionKey: "false",
    _id: false,
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
    coins: { type: Number, default: 0 },
    role: { type: String, enum: Object.values(user_interface_1.Role), default: user_interface_1.Role.USER },
    auths: [AuthProviderSchema],
    address: { type: addressSchema, required: true },
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
