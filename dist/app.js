"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const db_1 = __importDefault(require("./config/db"));
const customError_1 = __importDefault(require("./middleware/customError"));
const adminRoute_1 = __importDefault(require("./routes/api/adminRoute"));
const cors_1 = __importDefault(require("cors"));
(0, db_1.default)();
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
};
if (process.env.NODE_ENV === "development") {
    exports.app.use((0, morgan_1.default)("dev"));
}
exports.app.use((0, cors_1.default)(corsOptions));
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use("/api/v1/church", adminRoute_1.default);
exports.app.use(customError_1.default);
exports.app.all("*", (req, res) => {
    res.status(404).json({
        status: "fail",
        message: `Can't find ${req.originalUrl} on this server`,
    });
});
