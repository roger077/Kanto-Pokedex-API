/*
import { Sequelize } from "sequelize";
import Type from './models/Type'
import Pokemon from './models/Pokemon'
*/
import { DataSource } from "typeorm";
import { Pokemon } from "./entities/Pokemon";
import { Type } from "./entities/Type";

const AppDataSource  = new DataSource ({
    type: "postgres",
    host: "localhost",
    username:"postgres",
    password:"a2fafbf95a",
    database:"pokemons",
    synchronize:true,
    logging: true,
    entities:[Type,Pokemon]

})

export default AppDataSource;