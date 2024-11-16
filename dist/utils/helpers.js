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
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUpdateProfileResults = exports.sanitizePhone = void 0;
function sanitizePhone(phone) {
    if (phone.charAt(0) === "0") {
        const phoneCat = phone.slice(1);
        const phoneWithCode = "233" + phoneCat;
        return phoneWithCode;
    }
    return phone;
}
exports.sanitizePhone = sanitizePhone;
function adminUpdateProfileResults(req, res, data) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const admin = yield ((_b = (_a = req.context) === null || _a === void 0 ? void 0 : _a.services) === null || _b === void 0 ? void 0 : _b.userAdmin.adminUpdateProfile(data));
        console.log(admin);
        return res.status(200).json({
            _id: req.user._id,
            role: req.user.role,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            profileImage: admin === null || admin === void 0 ? void 0 : admin.profileImage,
            email: admin === null || admin === void 0 ? void 0 : admin.email,
            isSubmitFullDetails: req.user.isSubmitFullDetails
        });
    });
}
exports.adminUpdateProfileResults = adminUpdateProfileResults;
