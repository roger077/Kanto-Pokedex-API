import Server from './server'
import dotenv from 'dotenv'

async function main():Promise<void>{    
    dotenv.config();
    const server = new Server();
}

main()