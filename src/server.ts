import express,{Application} from 'express'
import cors from "cors"
import morgan from 'morgan';
import db from './db/connections'
import "reflect-metadata"
import router from './routes/index'
import loadDB from './routes/controllers/loadDb'
import {PORT,FRONT_APP} from './config/config'


export default class Server{
    private app : Application;
    private port : number;
    constructor(){
        this.app=express();
        this.port=PORT;
        this.dbConnect();
        this.listen();
        this.middlewares();
        this.routes()
    }
    listen():void{
        this.app.listen(this.port,()=>console.log(`Server listen on port ${this.port}`))
    }
    middlewares():void{
        this.app.use(express.json())
        this.app.use(morgan('dev'))        
        this.app.use(cors({
            origin:FRONT_APP,
            methods:['GET, POST, OPTIONS, PUT, DELETE']
        }))
    }
    routes():void{
        this.app.use(router);
    }
    async dbConnect():Promise<void>{
        try{
            
            await db.initialize()
            .then(()=>console.log("Database is connected"))
            .catch((error : Error)=>console.error({"ERROR IN DATABASE":error}))
            await loadDB()
            .then(()=>console.log("Database is loaded"))
            .catch((error: Error)=>console.error({"ERROR TO LOADED DATABASE":error}))
        }catch(error){
            console.error(`ERROR: ${error}`)
        }

    }
}