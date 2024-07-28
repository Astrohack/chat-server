import { Pool } from 'pg'
import logger from '@/utils/logger';
import config from '@/config'
import { DuplicateError, DatabaseError, APIError, DatabaseObjectNotFoundException } from '@/lib/errors';

interface Database {
    query<T>(sql: string, params?: Array<string | number | Array<string | number>>): Promise<Array<T>>
    query_first<T>(sql: string, params?: Array<string | number | Array<string | number>>): Promise<T>
    get_instance(): Database
}

class Database {

    private _pool: Pool

    private static _instance: Database

    constructor() {
        this._pool = new Pool({
            database: config.database.dbname,
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            port: config.database.port,
            max: 10,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
        })

        this._pool.on('error', err => logger.info(err));
    }

    static get_instance(): Database {
        if (!Database._instance)
            Database._instance = new Database();

        return Database._instance;
    }

    /**
     * Execute query on database.
     * 
     * @template T type of returned data
     * @param {string} sql sql query command
     * @param {(Array<string | number | Array<string | number>>)} [params] parameters to inject into query
     * @throws {DatabaseObjectNotFoundException} query execution returned no entries
     * @returns  {Promise<T>} Resolves when data is fetched from database, returns always array of given type T
     * @memberof Database
     */
    async query<T>(sql: string, params?: Array<string | number | Array<string | number>>): Promise<Array<T>> {
        const response = await this._pool.query(sql, params);
        return response.rows as Array<T>;
    }

    /**
     * Execute query on database.
     * 
     * Return first found object from fetched row.
     * @template T type of returned data
     * @param {string} sql sql query command
     * @param {(Array<string | number | Array<string | number>>)} [params] parameters to inject into query
     * @throws {DatabaseObjectNotFoundException} query execution returned no entries
     * @returns  {Promise<T>} Resolves when data is fetched from database
     * @memberof Database
     */
    async query_first<T>(sql: string, params?: Array<string | number | Array<string | number>>): Promise<T> {
        const response = await this._pool.query(sql, params);
        if (response.rows.length == 0)
            throw new DatabaseObjectNotFoundException(`Entry not found. Used command: ${sql}`)
        return response.rows[0] as T;
    }
    /**
     * Execute query on database that does not return anything.
     * @param {string} sql sql query command
     * @param {(Array<string | number | Array<string | number>>)} [params] parameters to inject into query
     * @throws {DatabaseObjectNotFoundException} query execution returned no entries
     * @returns  {Promise<T>} Resolves when data is fetched from database
     * @memberof Database
     */
    async execute(sql: string, params?: Array<string | number | Array<string | number>>): Promise<void> {
        await this._pool.query(sql, params);
    }
}

function get_error(error) {
    switch (error.code) {
        case 'ER_DUP_ENTRY':
            return new DuplicateError("Duplicate")

        case 'ER_NO_SUCH_TABLE':
            return new APIError("No such table", 500, "Missing database structure")

        default:
            return new DatabaseError("Unknown Error: " + error.code + "\n" + error.message)
    }
}

export default Database.get_instance();

