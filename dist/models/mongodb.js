"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var productsSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        require: true,
    },
    timestamp: {
        type: Date,
        require: true,
    },
    title: {
        type: String,
        require: true,
        max: 100,
    },
    description: {
        type: String,
        require: true,
        max: 100,
    },
    code: {
        type: Number,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    stock: {
        type: Number,
        require: true,
    },
    thumbnail: {
        type: String,
        require: true,
        max: 100,
    },
});
module.exports = {
    productos: mongoose_1.default.model("productos", productsSchema),
};
