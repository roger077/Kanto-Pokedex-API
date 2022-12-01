import { Router, Response, Request } from "express";
import {getTypes} from '../controllers/type'

const router=Router();

router.get('/',getTypes)


export default router;
