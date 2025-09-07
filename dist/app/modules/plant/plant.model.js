"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plant = void 0;
const mongoose_1 = require("mongoose");
const plant_interface_1 = require("./plant.interface");
const variantSchema = new mongoose_1.Schema({
    variantName: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
    },
    image: {
        type: String,
        required: true,
    },
    sku: {
        type: String,
        required: true,
    },
}, { _id: false });
const plantSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: Object.values(plant_interface_1.Category),
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    tags: {
        type: [String],
    },
    careInstructions: {
        type: String,
    },
    discount: {
        type: Number,
    },
    variants: {
        type: [variantSchema],
        required: true,
    },
    additionalImages: {
        type: [String],
    },
}, { timestamps: true, versionKey: false });
exports.Plant = (0, mongoose_1.model)("Plant", plantSchema);
