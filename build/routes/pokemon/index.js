"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pokemon_1 = require("../controllers/pokemon");
const router = (0, express_1.Router)();
router.get('/', pokemon_1.getPokemon);
//router.get('/filters',combinedFilters)
router.get('/:id', pokemon_1.getPokemonById);
exports.default = router;
