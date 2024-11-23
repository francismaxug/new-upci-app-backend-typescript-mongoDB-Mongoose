"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.devConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.devConfig = {
    initApp: {
        port: Number(process.env.PORT) || 8080,
        name: "Church Management",
        env: "development"
    },
    dbString: {
        uri: process.env.MONGO_URI
    }
};
