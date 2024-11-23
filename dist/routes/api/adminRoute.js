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
router.patch("/complete-registration", auth_1.protect, adminUser_1.completeRegistration);
// router.get("/logout", logout)
router.get("/getCurrentAdmin", auth_1.protect, adminUser_1.getCurrentAdmin);
router.get("/admin/profileInfo", auth_1.protect, adminUser_1.getAdminProfileInfo);
router.patch("/admin/updateprofile", auth_1.protect, adminUser_1.adminUpdateProfile);
router.post("/admin/get-reset-code", adminUser_1.requestForCode);
router.post("/admin/check-reset-code", auth_1.protect, adminUser_1.checkCodeSent);
router.post("/admin/reset-password", auth_1.protect, adminUser_1.resetPassword);
exports.default = router;
