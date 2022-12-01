import { Router } from "express";
import pokemonRoute from './pokemon/index'
import typeRouter from './types/index'
const router = Router();

router.use('/pokemon',pokemonRoute)

router.use('/type',typeRouter)

export default router