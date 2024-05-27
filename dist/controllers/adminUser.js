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
exports.getCurrentAdmin = exports.logout = exports.adminLogin = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = require("../utils/catchAsync");
// import getToken from "../utils/token.js"
const adminLogin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req);
    const { adminID, password } = req.body;
    console.log(adminID, password);
    const user = yield adminModel_1.default.findOne({ adminID });
    if (!user)
        return next(new appError_1.default("Invalid Credentials", 404));
    const checkPassword = yield user.comparePasswords(password);
    if (!checkPassword)
        return next(new appError_1.default("Invalid Credentials", 404));
    //continue with execution
    // getToken(user, res)
    res.status(200).json({
        status: "success",
        message: "Login Successful",
        user: {
            _id: user._id,
            isMainAdmin: user.isMainAdmin,
            firstName: user.firstName,
            lastName: user.lastName,
            profileImage: user.profileImage,
            email: user.email,
            isSubmitFullDetails: user.isSubmitFullDetails
        }
    });
    // console.log(user)
}));
exports.adminLogin = adminLogin;
const getCurrentAdmin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        user: {
            isMainAdmin: req.user.isMainAdmin,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            profileImage: req.user.profileImage,
            email: req.user.email
        }
    });
}));
exports.getCurrentAdmin = getCurrentAdmin;
const logout = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("jwt", "", {
        expires: new Date(0)
    });
    res.status(200).json({
        status: "success",
        message: "Logout Successful"
    });
}));
exports.logout = logout;
