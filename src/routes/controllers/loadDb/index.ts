import axios,{AxiosResponse} from 'axios'
import {Pokemon} from '../../../db/entities/Pokemon'
import {Type} from '../../../db/entities/Type'

async function loadPKMfromAPI():Promise<void>{

    const apiInfo : AxiosResponse = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');

    const pokeApiURL: Array<[AxiosResponse]> =  apiInfo.data.results.map(
        async (poke:any)=>{
            const pk = await axios.get(poke.url);
            return pk.data;
        } 
    )

    const typesApi:AxiosResponse = await axios.get('https://pokeapi.co/api/v2/type'); 
    typesApi.data.results.forEach(async (tp:any)=>{
        const type = new Type();
        type.name=tp.name;
        type.url=tp.url;
        await type.save();
        console.log(type);
    })
    const allPkmn: Array<[AxiosResponse]>= await Promise.all(pokeApiURL);
    
    allPkmn.forEach(async (e:any) => {

        const typeInfo= await Promise.all(
            e.types.map(async (t:any)=>{
                const currentType : Type|null=await Type.findOneBy({
                    name:t.type.name            
                })
                
                return currentType;
            })
        )
        const pokemonDb : Pokemon = new Pokemon();
        pokemonDb.name=e.name.charAt(0).toUpperCase() + e.name.slice(1);
        pokemonDb.hp=e.stats[0].base_stat;
        pokemonDb.attack=e.stats[1].base_stat;
        pokemonDb.defense=e.stats[2].base_stat;
        pokemonDb.speed=e.stats[5].base_stat;
        pokemonDb.height=e.height;
        pokemonDb.weight=e.weight;
        pokemonDb.image=e.sprites.other["official-artwork"].front_default;
        pokemonDb.types= typeInfo;
        await pokemonDb.save(); 
    })
}

export default loadPKMfromAPI