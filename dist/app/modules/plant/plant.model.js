"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plant = void 0;
const mongoose_1 = require("mongoose");
const plant_interface_1 = require("./plant.interface");
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
    },
    basePrice: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String],
    },
    careInstructions: {
        type: String,
    },
});
exports.Plant = (0, mongoose_1.model)("Plant", plantSchema);
