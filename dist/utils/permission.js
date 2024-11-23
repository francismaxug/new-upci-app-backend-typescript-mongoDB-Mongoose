"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permit = void 0;
const Roles = Object.freeze({
    AppUser: "AppUser",
    AppAdmin: "AppAdmin",
    Admin: "Admin",
    AppSuperUser: "AppSuperUser"
});
const PERMISIONS = {
    AppAdmin: [],
    User: ["save:info"]
};
const permit = (userType, permission) => {
    return PERMISIONS[userType].includes(permission);
};
exports.permit = permit;
