import express,{Application} from 'express'
import morgan from 'morgan'
import db from './db/connections'
import "reflect-metadata"
import router from './routes/index'
import loadDB from './routes/controllers/loadDb'
import {PORT} from './config/config'

declare module 'morgan';

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

        //this.app.use(()=> db.dropDatabase())
        this.app.use(express.json())
        this.app.use(morgan('dev'))
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
       //this.app.addListener('close',async ()=> await db.dropDatabase())
       //this.app.addListener('close',()=> console.log("close"))

    }
    routes():void{
        this.app.use(router);
    }
    async dbConnect():Promise<void>{
        try{
            
            await db.initialize()
            .then(()=>console.log("Database is connected"))
            .catch((error : Error)=>console.error({"ERROR IN DATABASE":error}))
            //console.log(db.options)
            await loadDB()
            .then(()=>console.log("Database is loaded"))
            .catch((error: Error)=>console.error({"ERROR TO LOADED DATABASE":error}))
        }catch(error){
            console.error(`ERROR: ${error}`)
        }

    }
}