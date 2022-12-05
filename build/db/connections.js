"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
import { Sequelize } from "sequelize";
import Type from './models/Type'
import Pokemon from './models/Pokemon'
*/
const typeorm_1 = require("typeorm");
const Pokemon_1 = require("./entities/Pokemon");
const Type_1 = require("./entities/Type");
const AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "a2fafbf95a",
    database: process.env.DB_NAME || "pokemons",
    synchronize: true,
    logging: true,
    entities: [Type_1.Type, Pokemon_1.Pokemon]
});
exports.default = AppDataSource;
