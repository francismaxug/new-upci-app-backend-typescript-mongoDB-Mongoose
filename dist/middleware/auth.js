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
//  const aj = arcjet({
//   // Get your site key from https://app.arcjet.com and set it as an environment
//   // variable rather than hard coding.
//   key: process.env.ARCJET_KEY as string,
//   characteristics: ["ip.src"], // Track requests by IP
//   rules: [
//     // Shield protects your app from common attacks e.g. SQL injection
//     shield({ mode: "LIVE" }),
//     // Create a bot detection rule
//     detectBot({
//       mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
//       // Block all bots except search engine crawlers. See
//       // https://arcjet.com/bot-list
//       allow: ["CATEGORY:SEARCH_ENGINE"]
//     }),
//     // Create a token bucket rate limit. Other algorithms are supported.
//     tokenBucket({
//       mode: "LIVE",
//       refillRate: 5, // Refill 5 tokens per interval
//       interval: 10, // Refill every 10 seconds
//       capacity: 10 // Bucket capacity of 10 tokens
//     })
//   ]
// })
const protect = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // console.log(req)
    let token;
    token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    // token = req.cookies.authsession
    // console.log(token)
    if (!token)
        return next((0, appError_1.default)("no token found", 404));
    const decodeUser = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    // console.log(decodeUser)
    if (!decodeUser)
        return next((0, appError_1.default)("no token found", 404));
    const currentUser = yield adminModel_1.default.findById(decodeUser.user._id).select("-password");
    if (!currentUser)
        return next((0, appError_1.default)("no token found", 404));
    // console.log("heyy", currentUser)
    req.user = currentUser;
    next();
}));
exports.protect = protect;
