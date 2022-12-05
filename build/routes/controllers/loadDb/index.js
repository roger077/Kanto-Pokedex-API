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
const axios_1 = __importDefault(require("axios"));
const Pokemon_1 = require("../../../db/entities/Pokemon");
const Type_1 = require("../../../db/entities/Type");
function loadPKMfromAPI() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiInfo = yield axios_1.default.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokeApiURL = apiInfo.data.results.map((poke) => __awaiter(this, void 0, void 0, function* () {
            const pk = yield axios_1.default.get(poke.url);
            return pk.data;
        }));
        const typesApi = yield axios_1.default.get('https://pokeapi.co/api/v2/type');
        typesApi.data.results.forEach((tp) => __awaiter(this, void 0, void 0, function* () {
            const type = new Type_1.Type();
            type.name = tp.name;
            type.url = tp.url;
            yield type.save();
            console.log(type);
        }));
        const allPkmn = yield Promise.all(pokeApiURL);
        allPkmn.forEach((e) => __awaiter(this, void 0, void 0, function* () {
            const typeInfo = yield Promise.all(e.types.map((t) => __awaiter(this, void 0, void 0, function* () {
                const currentType = yield Type_1.Type.findOneBy({
                    name: t.type.name
                });
                return currentType;
            })));
            const pokemonDb = new Pokemon_1.Pokemon();
            pokemonDb.name = e.name.charAt(0).toUpperCase() + e.name.slice(1);
            pokemonDb.hp = e.stats[0].base_stat;
            pokemonDb.attack = e.stats[1].base_stat;
            pokemonDb.defense = e.stats[2].base_stat;
            pokemonDb.speed = e.stats[5].base_stat;
            pokemonDb.height = e.height;
            pokemonDb.weight = e.weight;
            pokemonDb.image = e.sprites.other["official-artwork"].front_default;
            pokemonDb.types = typeInfo;
            yield pokemonDb.save();
        }));
    });
}
exports.default = loadPKMfromAPI;
