"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const geolocationSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserAdmin"
    },
    ipAddress: {
        type: String
    },
    name: String,
    role: String,
    region: {
        type: String
    },
    countryCode: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const UserLocation = mongoose_1.models.GeoLocation || (0, mongoose_1.model)("GeoLocation", geolocationSchema);
exports.default = UserLocation;
