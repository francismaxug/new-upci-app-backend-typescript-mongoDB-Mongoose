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
exports.sendSMS = void 0;
const sendSMS = (message, phone) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`https://api.wittyflow.com/v1/messages/send?app_id=${process.env.WITTIFLOW_API_ID}&app_secret=${process.env.WITTIFLOW_SECRETE}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: "UPCI-ABOKOB",
                to: phone,
                type: "1", // <!-- use 0 for flash sms and 1 for plain sms -->
                message
            })
        });
        if (!res.ok) {
            return false;
        }
        const data = yield res.json();
        return data;
    }
    catch (error) {
        throw error;
    }
});
exports.sendSMS = sendSMS;
