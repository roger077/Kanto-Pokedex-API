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
exports.getTypes = void 0;
const Type_1 = require("../../../db/entities/Type");
function getTypes(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const allTypes = yield Type_1.Type.find();
            if (!allTypes || allTypes.length < 1)
                return res.status(404).send({ "error": "Types not found" });
            return res.status(200).send({ "Types": allTypes });
        }
        catch (err) {
            return res.send({ "error": err });
        }
    });
}
exports.getTypes = getTypes;
