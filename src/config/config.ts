import dotenv from 'dotenv';
 
dotenv.config();

const PORT = Number(process.env.PORT);
const DB_USERNAME = process.env.DB_USERNAME
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = Number(process.env.DB_PORT);
const FRONT_APP=process.env.FRONT_APP
export{
    PORT,
    DB_USERNAME,
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    FRONT_APP
}



