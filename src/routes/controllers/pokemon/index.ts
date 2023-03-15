import { Request,Response } from 'express'
import { Pokemon } from '../../../db/entities/Pokemon';
import { Type } from '../../../db/entities/Type';
import { ILike, Between } from 'typeorm';




export async function  getPokemon (req: Request, res:Response): Promise<Response>{
    try{
        const {order,...query}=req.query
        const conditions=await combinedFilters(query)        
        const [prop,value]= order?.toString().split('/') ||[];
        
        const allPokemon:Pokemon[]  = await Pokemon.find({
            where:conditions,
            order:{
                [prop]:value
            },
            relations:{
                types:true
            }
        })
        if(!allPokemon||allPokemon.length<1) return res.status(404).send({"error":"Pokemon/s not found"})
        return res.status(200).send({
            "Pokemons":allPokemon
        })
    }catch(err){
        return res.status(500).send({"error":err})
    }
}

export async function getPokemonById (req:Request,res:Response):Promise<Response>{
    try{
        const {id} = req.params;
        if(!id) return res.status(500).send({"error":"Id not found"})
        const searchPkmn : Pokemon|null = await Pokemon.findOne({
            where:{id},
            relations:{
                types:true
            }
        })
        if(!searchPkmn) return res.status(404).send({"error":"Pokemon not found"})
        return res.status(200).send({"Pokemon":searchPkmn})
    }catch(err){
        return res.status(500).send({"error":err})
    }
}

async function combinedFilters(condition:any):Promise<any>{

    const conditionSearch:any={};
    for(const prop in condition){
        if(prop==="name"){
            conditionSearch[prop]= ILike(`%${condition[prop]}%`)
        }else if(prop==="types"){
            const types : Type[] = await Promise.all(condition[prop].split('/').map(
                async(type:string)=>await Type.find({
                    where:{
                        name:type
                    }
                })
            ))
            conditionSearch[prop]=types
        }
        else{
            const [min,max]=condition[prop].split('/')
            conditionSearch[prop]=Between(parseInt(min),parseInt(max))
        } 
    }
    return conditionSearch;
}