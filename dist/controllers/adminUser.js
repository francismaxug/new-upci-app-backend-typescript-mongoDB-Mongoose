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
exports.resetPassword = exports.checkCodeSent = exports.requestForCode = exports.adminUpdateProfile = exports.getAdminProfileInfo = exports.getCurrentAdmin = exports.completeRegistration = exports.adminLogin = void 0;
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = require("../utils/catchAsync");
const admin_1 = require("../validators/admin");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const helpers_1 = require("../utils/helpers");
const location_1 = __importDefault(require("../location"));
const permission_1 = require("../utils/permission");
//-----------------login admin----------------------
const adminLogin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { adminID, password } = req.body;
    if (!adminID || !password) {
        return next((0, appError_1.default)("Please provide email and password", 400));
    }
    const { error } = (0, admin_1.validateAdmin)({ adminID, password });
    console.log(error);
    if (error) {
        const errorInputs = error.details[0].message;
        console.log(errorInputs);
        return next((0, appError_1.default)("Invalid Credentials", 400));
    }
    // const apiip = Apiip('f3e954e8-4601-4ff7-9fc1-bef3581f7bf0', { ssl: false })
    const results = (yield location_1.default);
    // console.log("results", results)
    const admin = yield ((_b = (_a = req.context) === null || _a === void 0 ? void 0 : _a.services) === null || _b === void 0 ? void 0 : _b.userAdmin.login({
        adminID,
        password
    }));
    const check = (0, permission_1.permit)((_c = admin === null || admin === void 0 ? void 0 : admin.user) === null || _c === void 0 ? void 0 : _c.role, "save:info");
    // console.log(check)
    if (check)
        yield ((_e = (_d = req.context) === null || _d === void 0 ? void 0 : _d.services) === null || _e === void 0 ? void 0 : _e.userAdmin.saveLocationDetails(results, adminID));
    return res.status(200).json(admin);
}));
exports.adminLogin = adminLogin;
// const rateLimit = catchAsync(
//   async (req: Request<{}, {}, ReqBody>, res: Response, next: NextFunction) => {
//     const { adminID, password } = req.body
//     if (!adminID || !password) {
//       return next(createError("Please provide email and password", 400))
//     }
//     const { error } = validateAdmin({ adminID, password })
//     console.log(error)
//     if (error) {
//       const errorInputs = error.details[0].message
//       console.log(errorInputs)
//       return next(createError("Invalid Credentials", 400))
//     }
//     // const apiip = Apiip('f3e954e8-4601-4ff7-9fc1-bef3581f7bf0', { ssl: false })
//     // const results = await resultsLocation as IGeoLocation
//     // console.log("results",results)
//     const admin = await req.context?.services?.userAdmin.login({
//       adminID,
//       password
//     })
//     return res.status(200).json(admin)
//   }
// )
//----------complete registration of admin----------------------
const completeRegistration = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _f, _g;
    // const { country, placeOfResidence, email, phoneNumber, position, region } = req.body
    const changePhoneNumToGhanaCode = (0, helpers_1.sanitizePhone)(req.body.phoneNumber);
    const { error } = (0, admin_1.validateCompleteRegistration)(req.body);
    console.log(error);
    if (error) {
        const errorInputs = error.details[0].message;
        console.log(errorInputs);
        return next((0, appError_1.default)(`${errorInputs}`, 400));
    }
    const admin = yield ((_g = (_f = req.context) === null || _f === void 0 ? void 0 : _f.services) === null || _g === void 0 ? void 0 : _g.userAdmin.completeRegistration(Object.assign(Object.assign({}, req.body), { phoneNumber: changePhoneNumToGhanaCode, _id: req.user._id })));
    // console.log(admin)
    return res.status(200).json(admin);
}));
exports.completeRegistration = completeRegistration;
//-------get current active admin----------------------
const getCurrentAdmin = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user)
    return res.status(200).json({
        _id: req.user._id,
        role: req.user.role,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        profileImage: req.user.profileImage,
        email: req.user.email,
        isSubmitFullDetails: req.user.isSubmitFullDetails
    });
}));
exports.getCurrentAdmin = getCurrentAdmin;
//-------get admin profile info for update----------------------
const getAdminProfileInfo = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user)
    // console.log("hello")
    return res.status(200).json({
        firstName: req.user.firstName,
        role: req.user.role,
        lastName: req.user.lastName,
        profileImage: req.user.profileImage,
        email: req.user.email,
        country: req.user.country,
        position: req.user.position,
        region: req.user.region,
        placeOfResidence: req.user.placeOfResidence,
        phoneNumber: req.user.phoneNumber,
        languages: req.user.languages,
        address: req.user.address,
        zipCode: req.user.zipCode,
        createdAt: req.user.createdAt
    });
}));
exports.getAdminProfileInfo = getAdminProfileInfo;
//----------update profile of admin----------------------
const adminUpdateProfile = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    // console.log("hii",req.body)
    //----change phone number to add countrycode 233*********** ------------------
    const changePhoneNumToGhanaCode = (0, helpers_1.sanitizePhone)(req.body.phoneNumber);
    //-----manipulate languages string into an array---------------
    const languagesArr = req.body.languages
        .split(" ")
        .filter((item) => item !== "");
    //-----------------check if there is no image selected by user----------------------
    if (!req.files || Object.keys(req.files).length === 0) {
        return (0, helpers_1.adminUpdateProfileResults)(req, res, Object.assign(Object.assign({}, req.body), { languages: languagesArr, phoneNumber: changePhoneNumToGhanaCode, _id: req.user._id }));
    }
    // console.log(req.body)
    // console.log(req.user)
    // console.log(req.files)
    const file1 = (_h = req.files) === null || _h === void 0 ? void 0 : _h.profileImage;
    // console.log(file1)
    let imageData;
    let mimetype;
    // Check if it's a single file
    if (file1 instanceof Array) {
        // If it's an array, access the first file
        imageData = file1[0].data;
        mimetype = file1[0].mimetype;
    }
    else {
        // If it's a single file
        imageData = file1 === null || file1 === void 0 ? void 0 : file1.data;
        mimetype = file1 === null || file1 === void 0 ? void 0 : file1.mimetype;
    }
    console.log(imageData);
    // Convert image to base64
    const tobase64 = imageData.toString("base64");
    //-----------------If user selects a new image, check if the has an old image in the datatabse, if so delete the old one from cloudinary and upload a new one----------------------
    const checkPublickId = req.user.cloudianryPublicId;
    if (checkPublickId) {
        // Delete old image from Cloudinary
        yield cloudinary_1.default.uploader.destroy(checkPublickId);
        // Upload new image to Cloudinary
        const upload = yield cloudinary_1.default.uploader.upload(`data:${mimetype};base64,${tobase64}`, {
            folder: "upci-church-uploads"
        });
        const newBody = Object.assign(Object.assign({}, req.body), { phoneNumber: changePhoneNumToGhanaCode, languages: languagesArr, profileImage: upload.secure_url, cloudianryPublicId: upload.public_id });
        console.log(newBody);
        return (0, helpers_1.adminUpdateProfileResults)(req, res, Object.assign(Object.assign({}, newBody), { _id: req.user._id }));
    }
    //-----------------if user is now about to add a profile image----------------------
    // Upload to Cloudinary
    const upload = yield cloudinary_1.default.uploader.upload(`data:${mimetype};base64,${tobase64}`, {
        folder: "upci-church-uploads"
    });
    const newBody = Object.assign(Object.assign({}, req.body), { profileImage: upload.secure_url, cloudianryPublicId: upload.public_id, languages: languagesArr, phoneNumber: changePhoneNumToGhanaCode });
    // console.log(newBody)
    return (0, helpers_1.adminUpdateProfileResults)(req, res, Object.assign(Object.assign({}, newBody), { _id: req.user._id }));
}));
exports.adminUpdateProfile = adminUpdateProfile;
const requestForCode = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k;
    // const { country, placeOfResidence, email, phoneNumber, position, region } = req.body
    const changePhoneNumToGhanaCode = (0, helpers_1.sanitizePhone)(req.body.phoneNumber);
    // console.log(changePhoneNumToGhanaCode)
    const admin = yield ((_k = (_j = req.context) === null || _j === void 0 ? void 0 : _j.services) === null || _k === void 0 ? void 0 : _k.userAdmin.adminRequestResetCode(changePhoneNumToGhanaCode, req.body.phoneNumber));
    // console.log(admin)
    return res.status(200).json(admin);
}));
exports.requestForCode = requestForCode;
const checkCodeSent = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { country, placeOfResidence, email, phoneNumber, position, region } = req.body
    var _l, _m;
    const admin = yield ((_m = (_l = req.context) === null || _l === void 0 ? void 0 : _l.services) === null || _m === void 0 ? void 0 : _m.userAdmin.adminSendsSecreteCode(req.user._id, req.body.code));
    // console.log(admin)
    return res.status(200).json(admin);
}));
exports.checkCodeSent = checkCodeSent;
const resetPassword = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { country, placeOfResidence, email, phoneNumber, position, region } = req.body
    var _o, _p, _q;
    const admin = yield ((_p = (_o = req.context) === null || _o === void 0 ? void 0 : _o.services) === null || _p === void 0 ? void 0 : _p.userAdmin.adminResetPassword(req.user._id, (_q = req.body) === null || _q === void 0 ? void 0 : _q.newPassword));
    // console.log(admin)
    return res.status(200).json(admin);
}));
exports.resetPassword = resetPassword;
