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
exports.AdminServices = void 0;
const app_1 = require("../types/app");
const appError_1 = __importDefault(require("../utils/appError"));
const helpers_1 = require("../utils/helpers");
const sms_1 = require("../utils/sms");
// import sendEmailToUser from "../utils/email"
class AdminServices extends app_1.InitAdmin {
    constructor(context) {
        super(context);
        this.login = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.queryDB.adminModel.findOne({
                    adminID: input.adminID
                });
                if (!user)
                    throw (0, appError_1.default)("Invalid Credentials", 404);
                const checkPassword = yield user.comparePasswords(input.password);
                if (!checkPassword)
                    throw (0, appError_1.default)("Invalid Credentials", 404);
                const authAdmin = {
                    status: "success",
                    message: "Login Successful",
                    user: {
                        _id: user._id,
                        role: user.role,
                        phoneNumber: user.phoneNumber,
                        status: user === null || user === void 0 ? void 0 : user.status,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        profileImage: user.profileImage,
                        email: user.email,
                        isSubmitFullDetails: user.isSubmitFullDetails
                    }
                };
                return authAdmin;
            }
            catch (err) {
                throw err;
            }
        });
        this.saveLocationDetails = (location, admin) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.queryDB.adminModel.findOne({
                    adminID: admin
                });
                console.log(user);
                yield this.queryDB.geolocation.create({
                    user: user === null || user === void 0 ? void 0 : user._id,
                    name: (user === null || user === void 0 ? void 0 : user.lastName) + " " + (user === null || user === void 0 ? void 0 : user.firstName),
                    role: user === null || user === void 0 ? void 0 : user.role,
                    country: location.countryName,
                    countryCode: location.countryCode,
                    region: location.regionName,
                    city: location.city,
                    ipAddress: location.ip
                });
            }
            catch (err) {
                throw err;
            }
        });
        this.completeRegistration = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.queryDB.adminModel.findByIdAndUpdate(input._id, {
                    email: input.email,
                    country: input.country,
                    region: input.region,
                    placeOfResidence: input.placeOfResidence,
                    phoneNumber: input.phoneNumber,
                    position: input.position,
                    isSubmitFullDetails: true
                }, { new: true });
                return {
                    status: "success",
                    message: "Registration Successful"
                };
            }
            catch (err) {
                throw err;
            }
        });
        this.adminUpdateProfile = (input) => __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = yield this.queryDB.adminModel.findByIdAndUpdate(input._id, {
                    email: input.email,
                    country: input.country,
                    region: input.region,
                    placeOfResidence: input.placeOfResidence,
                    phoneNumber: input.phoneNumber,
                    zipCode: input.zipCode,
                    address: input.address,
                    languages: input.languages,
                    profileImage: input.profileImage,
                    firstName: input.firstName,
                    lastName: input.lastName,
                    cloudianryPublicId: input.cloudianryPublicId
                }, { new: true });
                return admin;
            }
            catch (err) {
                throw err;
            }
        });
        this.adminRequestResetCode = (input, phone) => __awaiter(this, void 0, void 0, function* () {
            try {
                const findAdmin = yield this.queryDB.adminModel.findOne({
                    phoneNumber: input
                });
                if (!findAdmin)
                    throw (0, appError_1.default)("User does not exist", 404);
                // console.log(findAdmin)
                const code = yield (0, helpers_1.generateRandomCode)();
                yield this.queryDB.code.create({
                    code,
                    user: findAdmin._id
                });
                const message = (0, helpers_1.message_template)(findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin.lastName, code);
                const isSent = yield (0, sms_1.sendSMS)(message, input);
                // console.log(isSent)
                if (!isSent)
                    throw (0, appError_1.default)("Failed to send SMS", 500);
                console.log(code);
                return {
                    status: "success",
                    message: "Code has been sent to your phone number",
                    code,
                    user: {
                        _id: findAdmin._id,
                        role: findAdmin.role,
                        phoneNumber: phone,
                        status: findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin.status,
                        firstName: findAdmin.firstName,
                        lastName: findAdmin.lastName,
                        profileImage: findAdmin.profileImage,
                        email: findAdmin.email,
                        isSubmitFullDetails: findAdmin.isSubmitFullDetails
                    }
                };
            }
            catch (err) {
                throw err;
            }
        });
        this.adminSendsSecreteCode = (userId, code) => __awaiter(this, void 0, void 0, function* () {
            try {
                const findAdmin = yield this.queryDB.code
                    .findOne({
                    user: userId,
                    code,
                    isUsed: false
                })
                    .sort({
                    createdAt: -1
                });
                // console.log(findAdmin)
                if (!findAdmin)
                    throw (0, appError_1.default)("Invalid or expired code", 404);
                findAdmin.isUsed = true;
                yield findAdmin.save();
                return {
                    status: "success"
                };
            }
            catch (err) {
                throw err;
            }
        });
        this.adminResetPassword = (userId, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                const findAdmin = yield this.queryDB.adminModel.findById(userId);
                console.log(findAdmin);
                if (!findAdmin)
                    throw (0, appError_1.default)("User does not exist", 404);
                findAdmin.password = password;
                yield findAdmin.save();
                const res = (0, helpers_1.sendEmailFunction)({
                    name: findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin.lastName,
                    email: findAdmin === null || findAdmin === void 0 ? void 0 : findAdmin.email
                });
                // await sendEmailToUser({
                //   email: res.email,
                //   message: res.message,
                //   subject: res.subject,
                //   text: res.text
                // })
                return {
                    status: "success",
                    message: "Password reset successful"
                };
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.AdminServices = AdminServices;
