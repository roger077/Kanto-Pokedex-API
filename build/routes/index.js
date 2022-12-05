"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("./pokemon/index"));
const index_2 = __importDefault(require("./types/index"));
const router = (0, express_1.Router)();
router.use('/pokemon', index_1.default);
router.use('/type', index_2.default);
exports.default = router;
