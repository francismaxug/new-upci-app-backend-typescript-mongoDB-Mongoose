"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminUser_1 = require("../../controllers/adminUser");
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.post("/login", adminUser_1.adminLogin);
router.get("/logout", adminUser_1.logout);
router.get("/getCurrentAdmin", auth_1.protect, adminUser_1.getCurrentAdmin);
exports.default = router;