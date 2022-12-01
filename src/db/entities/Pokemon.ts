import {
    Entity,
    Column,
    BaseEntity,
    PrimaryColumn,
    Generated,
    ManyToMany
} from "typeorm";

import { Type } from "./Type";

@Entity('pokemons')
export class Pokemon extends BaseEntity{
    @PrimaryColumn({type:"uuid"})
    @Generated("uuid")
    id:string;

    @Column("text")
    name:string;

    @Column("int")
    hp:number
    
    @Column("int")
    defense:number

    @Column("int")
    speed:number

    @Column("int")
    height:number

    @Column("int")
    attack:number

    @Column("int")
    weight:number

    @Column("varchar")
    image:string

    @ManyToMany(()=>Type,(type)=>type.pokemons)
    types:Type[]

}


