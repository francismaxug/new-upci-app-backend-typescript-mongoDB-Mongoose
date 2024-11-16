"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCompleteRegistration = exports.validateAdmin = void 0;
//----------JOI VALIDATOR TO VALIDATE USER INPUTS-----------------
const joi_1 = __importDefault(require("joi"));
const validateAdminInput = (schema) => (payload) => schema.validate(payload, { abortEarly: true });
const adminValidation = joi_1.default.object({
    adminID: joi_1.default.string().min(6).max(6).required(),
    password: joi_1.default.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
});
const validateAdmin = validateAdminInput(adminValidation);
exports.validateAdmin = validateAdmin;
const validateAdminCompleteRegistration = (schema) => (payload) => schema.validate(payload, { abortEarly: true });
const adminCompleteRegistrationValidation = joi_1.default.object({
    country: joi_1.default.string().required(),
    placeOfResidence: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string().required(),
    email: joi_1.default.string()
        .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "gh", "info"] }
    })
        .required(),
    position: joi_1.default.string().required(),
    region: joi_1.default.string().required()
});
const validateCompleteRegistration = validateAdminCompleteRegistration(adminCompleteRegistrationValidation);
exports.validateCompleteRegistration = validateCompleteRegistration;
