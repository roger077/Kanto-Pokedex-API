"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const connections_1 = __importDefault(require("./db/connections"));
require("reflect-metadata");
const index_1 = __importDefault(require("./routes/index"));
const loadDb_1 = __importDefault(require("./routes/controllers/loadDb"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = 3001;
        this.dbConnect();
        this.listen();
        this.middlewares();
        this.routes();
    }
    listen() {
        this.app.listen(this.port, () => console.log(`Server listen on port ${this.port}`));
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
    }
    routes() {
        this.app.use(index_1.default);
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connections_1.default.initialize()
                    .then(() => console.log("Database is connected"))
                    .catch((error) => console.error({ "ERROR IN DATABASE": error }));
                yield (0, loadDb_1.default)()
                    .then(() => console.log("Database is loaded"))
                    .catch((error) => console.error({ "ERROR TO LOADED DATABASE": error }));
            }
            catch (error) {
                console.error(`ERROR: ${error}`);
            }
        });
    }
}
exports.default = Server;
