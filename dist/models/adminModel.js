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
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model, models, SchemaTypes } = mongoose_1.default;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userAdminSchema = new Schema({
    adminID: {
        type: String,
        unique: true,
        required: [true, "Admin ID is required"]
    },
    role: {
        type: String,
        enum: ["User", "AppAdmin", "AppSuperAdmin"],
        default: "User"
    },
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    region: {
        type: String,
        default: ""
    },
    placeOfResidence: {
        type: String,
        default: ""
    },
    phoneNumber: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    zipCode: {
        type: String,
        default: ""
    },
    cloudianryPublicId: {
        type: String,
        default: ""
    },
    languages: {
        type: [String],
        default: []
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    position: {
        enum: [
            "Head Pastor",
            "Deacon",
            "Admin",
            "Acountant / Finance",
            "Ministry Leader"
        ],
        type: String,
        default: "Head Pastor"
    },
    status: {
        enum: [
            "Active",
            "Inactive"
        ],
        type: String,
        default: "Active"
    },
    isSubmitFullDetails: {
        type: Boolean,
        default: false
    },
    profileImage: {
        type: String,
        default: ""
    }
}, { timestamps: true });
userAdminSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        try {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hashs = yield bcryptjs_1.default.hash(this.password, salt);
            this.password = hashs;
            return;
        }
        catch (error) {
            console.log(error);
        }
    });
});
//compaere passwords
userAdminSchema.methods.comparePasswords = function (password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, this.password);
    });
};
const UserAdmin = models.UserAdmin ||
    model("UserAdmin", userAdminSchema);
exports.default = UserAdmin;
