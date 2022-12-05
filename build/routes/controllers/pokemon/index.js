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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPokemonById = exports.getPokemon = void 0;
const Pokemon_1 = require("../../../db/entities/Pokemon");
const Type_1 = require("../../../db/entities/Type");
const typeorm_1 = require("typeorm");
function getPokemon(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const _a = req.query, { order } = _a, query = __rest(_a, ["order"]);
            const conditions = yield combinedFilters(query);
            //const {order} = req.body
            const [prop, value] = (order === null || order === void 0 ? void 0 : order.toString().split('/')) || [];
            console.log({ [prop]: value });
            const allPokemon = yield Pokemon_1.Pokemon.find({
                where: conditions,
                order: {
                    [prop]: value
                },
                relations: {
                    types: true
                }
            });
            if (!allPokemon || allPokemon.length < 1)
                return res.status(404).send({ "error": "Pokemon/s not found" });
            return res.status(200).send({
                "Pokemons": allPokemon
            });
        }
        catch (err) {
            return res.status(500).send({ "error": err });
        }
    });
}
exports.getPokemon = getPokemon;
function getPokemonById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            if (!id)
                return res.status(500).send({ "error": "Id not found" });
            const searchPkmn = yield Pokemon_1.Pokemon.findOneBy({ id });
            if (!searchPkmn)
                return res.status(404).send({ "error": "Pokemon not found" });
            return res.status(200).send({ "Pokemon": searchPkmn });
        }
        catch (err) {
            return res.status(500).send({ "error": err });
        }
    });
}
exports.getPokemonById = getPokemonById;
function combinedFilters(condition) {
    return __awaiter(this, void 0, void 0, function* () {
        const conditionSearch = {};
        for (const prop in condition) {
            if (prop === "name") {
                conditionSearch[prop] = (0, typeorm_1.ILike)(`%${condition[prop]}%`);
            }
            else if (prop === "types") {
                const types = yield Promise.all(condition[prop].split('/').map((type) => __awaiter(this, void 0, void 0, function* () {
                    return yield Type_1.Type.find({
                        where: {
                            name: type
                        }
                    });
                })));
                conditionSearch[prop] = types;
            }
            else {
                const [min, max] = condition[prop].split('/');
                conditionSearch[prop] = (0, typeorm_1.Between)(parseInt(min), parseInt(max));
            }
        }
        return conditionSearch;
    });
}
