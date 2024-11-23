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
exports.sendEmailFunction = exports.message_template = exports.generateRandomCode = exports.adminUpdateProfileResults = exports.sanitizePhone = void 0;
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
function generateRandomCode() {
    return new Promise((resolve) => {
        const codeLength = 5;
        let code = "";
        for (let i = 0; i < codeLength; i++) {
            const digit = Math.floor(Math.random() * 10); // Generate a random digit from 0 to 9
            code += digit.toString();
        }
        resolve(code);
    });
}
exports.generateRandomCode = generateRandomCode;
const message_template = (name, code) => {
    return `Hello ${name}, your password reset code is: ${code}. This code will expire in 10 minutes. Kindly ignore this message if you did not request for a password reset`;
};
exports.message_template = message_template;
//  function generateRandomCode() {
//   let code = ""
//   for (let i = 0; i <= 4; i++) {
//     console.log(i)
//     const random_number = Math.floor(Math.random() * 10)
//     console.log(random_number)
//     code += random_number
//   }
//   return code
// }
function sendEmailFunction(user) {
    const message = `Hello ${user.name}, Your password reset was successful`;
    return {
        email: user.email,
        subject: `password reset success`,
        message,
        text: `password reset success`
    };
}
exports.sendEmailFunction = sendEmailFunction;
