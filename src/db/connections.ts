import { DataSource } from "typeorm";
import { Pokemon } from "./entities/Pokemon";
import { Type } from "./entities/Type";
import {DB_USERNAME,DB_HOST,DB_NAME,DB_PASSWORD,DB_PORT} from '../config/config'

const AppDataSource  = new DataSource ({
    type: "postgres",
    host: DB_HOST,
    port:DB_PORT, 
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    synchronize:true,
    logging: true,
    entities:[Type,Pokemon]
})

export default AppDataSource;