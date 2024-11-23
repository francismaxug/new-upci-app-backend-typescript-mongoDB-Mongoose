"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const int = parseInt(process.env.HASH_NUMBER);
const admin = [
    {
        adminID: process.env.ADMIN_ID_1,
        password: bcryptjs_1.default.hashSync(process.env.ADMIN_PASSWORD, int),
        role: process.env.ADMIN_1_ROLE || "",
        firstName: process.env.MAIN_ADMIN_FIRST_NAME || "",
        lastName: process.env.MAIN_ADMIN_LAST_NAME || "",
        phoneNumber: process.env.ADMIN_1_PHONE
    },
    {
        adminID: process.env.ADMIN_ID_2,
        password: bcryptjs_1.default.hashSync(process.env.ADMIN_PASSWORD, int),
        firstName: process.env.FIRST_ADMIN_FIRST_NAME || "",
        lastName: process.env.FIRST_ADMIN_LAST_NAME || "",
        phoneNumber: process.env.ADMIN_2_PHONE
    },
    {
        adminID: process.env.ADMIN_ID_3,
        password: bcryptjs_1.default.hashSync(process.env.ADMIN_PASSWORD, int),
        firstName: process.env.SECOND_ADMIN_FIRST_NAME || "",
        lastName: process.env.SECOND_ADMIN_LAST_NAME || "",
        phoneNumber: process.env.ADMIN_3_PHONE
    },
    {
        adminID: process.env.ADMIN_ID_4,
        password: bcryptjs_1.default.hashSync(process.env.ADMIN_PASSWORD, int),
        role: process.env.ADMIN_4_ROLE || "",
        firstName: process.env.SUPER_ADMIN_FIRST_NAME || "",
        lastName: process.env.SUPER_ADMIN_LAST_NAME || "",
        phoneNumber: process.env.ADMIN_4_PHONE
    }
];
exports.default = admin;
