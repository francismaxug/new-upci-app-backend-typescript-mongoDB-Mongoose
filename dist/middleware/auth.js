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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const adminModel_1 = __importDefault(require("../models/adminModel"));
const catchAsync_1 = require("../utils/catchAsync");
const appError_1 = __importDefault(require("../utils/appError"));
const protect = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    let token;
    token = req.cookies.session;
    console.log(token);
    if (!token)
        return next(new appError_1.default("no token found", 404));
    const decodeUser = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    console.log(decodeUser);
    if (!decodeUser)
        return next(new appError_1.default("invalid token", 404));
    const currentUser = yield adminModel_1.default.findById(decodeUser.user._id).select("-password");
    console.log(currentUser);
    if (!currentUser)
        return next(new appError_1.default("user not found", 404));
    req.user = currentUser;
    next();
}));
exports.protect = protect;
