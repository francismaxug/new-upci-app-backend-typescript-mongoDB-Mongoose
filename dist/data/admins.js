"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const int = parseInt(process.env.HASH_NUMBER);
const isAdmin = Boolean(process.env.IS_ADMIN);
const admin = [
    {
        adminID: process.env.ADMIN_ID_1,
        password: bcryptjs_1.default.hashSync(process.env.ADMIN_PASSWORD, int),
        isAdmin: isAdmin,
        isMainAdmin: true,
        firstName: "Ps. Elvis",
        lastName: "Ashiabi"
    },
    {
        adminID: process.env.ADMIN_ID_2,
        password: bcryptjs_1.default.hashSync(process.env.ADMIN_PASSWORD, int),
        isAdmin: isAdmin,
        firstName: "Deac. David",
        lastName: "Atinga"
    },
    {
        adminID: process.env.ADMIN_ID_3,
        password: bcryptjs_1.default.hashSync(process.env.ADMIN_PASSWORD, int),
        isAdmin: isAdmin,
        firstName: "Mr. Francis",
        lastName: "Aidoo"
    },
    {
        adminID: process.env.ADMIN_ID_4,
        password: bcryptjs_1.default.hashSync(process.env.ADMIN_PASSWORD, int),
        isAdmin: isAdmin,
        firstName: "Atinga",
        lastName: "Francis"
    }
];
exports.default = admin;
