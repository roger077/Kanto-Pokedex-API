import { Request, Response } from "express";
import { Type } from "../../../db/entities/Type";
export async function getTypes(req:Request,res:Response):Promise<Response>{
    try{
        const allTypes : Type[]=await Type.find();
        if(!allTypes||allTypes.length<1)return res.status(404).send({"error":"Types not found"})
        return res.status(200).send({"Types":allTypes})
    }catch(err){
        return res.send({"error":err})
    }
}

