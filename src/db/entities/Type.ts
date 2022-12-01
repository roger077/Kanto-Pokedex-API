import {
    Entity,
    Column,
    BaseEntity,
    PrimaryColumn,
    Generated,
    ManyToMany,
    JoinTable
} from "typeorm";

import { Pokemon } from "./Pokemon";

@Entity("types")
export class Type extends BaseEntity{
    @PrimaryColumn({type:"uuid"})
    @Generated("uuid")
    id:string;

    @Column("varchar")
    name:string;
    
    @Column("varchar")
    url:string;

    @ManyToMany(()=>Pokemon,(pokemon)=>pokemon.types)
    @JoinTable({
        name:"poke_types",
        joinColumn:{
            name:"type_id",
            referencedColumnName:"id"
        },
        inverseJoinColumn:{
            name:"poke_id",
            referencedColumnName:"id"
        }
    })
    pokemons: Pokemon[];
}