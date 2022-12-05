"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const type_1 = require("../controllers/type");
const router = (0, express_1.Router)();
router.get('/', type_1.getTypes);
exports.default = router;
