import { config as load_dotenv } from 'dotenv'

import { default as config_file } from '@/config/config.json' 

load_dotenv({ path: __dirname + '/../.env' })

export interface Config {
    secretKey: string,
    tokenExpirity: number,
    database: {
        host: string,
        dbname: string,
        password: string,
        user: string,
        port: number
    }, 
    host: string,
    apiPort: number,
    serverId: string,
    logLevel: string,
}
const config: Config = config_file as any

// Copy env variables to exported object
config.database = {
    host: process.env.DB_HOST as string ?? config.database.host,
    password: process.env.DB_PASSWORD as string ?? config.database.password,
    port: parseInt(process.env.DB_PORT as string) ?? config.database.port,
    user: process.env.DB_USER as string ?? config.database.user,
    dbname: process.env.DB_DBNAME as string ?? config.database.dbname,
};
config.apiPort = parseInt(process.env.API_PORT as string) ?? config.apiPort;
config.host = process.env.API_HOST as string ?? config.host;
config.serverId = process.env.SERVER_ID as string ?? config.serverId;
config.logLevel = process.env.LOG_LEVEL as string ?? config.logLevel;

export default config;
export { config  };