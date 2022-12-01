import { Router } from "express";
import {getPokemon,getPokemonById/*,combinedFilters*/} from "../controllers/pokemon";

const router = Router();

router.get('/',getPokemon)

//router.get('/filters',combinedFilters)

router.get('/:id',getPokemonById)
export default router;