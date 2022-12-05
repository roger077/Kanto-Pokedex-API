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
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "a2fafbf95a",
    database: process.env.DB_NAME || "pokemons",
    synchronize:true,
    logging: true,
    entities:[Type,Pokemon]
})

export default AppDataSource;