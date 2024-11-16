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
// Desc: This file is used to seed the database with sample data
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const adminModel_1 = __importDefault(require("./models/adminModel"));
const admins_1 = __importDefault(require("./data/admins"));
const serve_1 = __importDefault(require("./models/serve"));
const serve_2 = require("./config/serve");
(0, serve_1.default)(serve_2.config.dbString);
const importData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield adminModel_1.default.deleteMany();
        yield adminModel_1.default.insertMany(admins_1.default);
        console.log("Data imported successfully");
    }
    catch (error) {
        console.log(`${error.message}`);
    }
    process.exit();
});
const destroyData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield adminModel_1.default.deleteMany();
        console.log("Data destroyed successfully");
    }
    catch (error) {
        console.log(`${error.message}`);
    }
    process.exit();
});
if (process.argv[2] === "--destroyData") {
    destroyData();
}
else if (process.argv[2] === "--importData") {
    importData();
}
