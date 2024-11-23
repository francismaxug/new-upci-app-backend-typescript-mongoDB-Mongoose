"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teams_1 = require("../../controllers/teams");
const router = (0, express_1.Router)();
router.get("/getAllTeams", teams_1.getAllMembers);
exports.default = router;
