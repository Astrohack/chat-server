const mysql = require('mysql')
const config = require('../config')
const { DuplicateError, DatabaseError, NotFoundError, APIError } = require('../lib/errors');

var pool


(async () => {

    pool = mysql.createPool({
        connectionLimit: 10,
        host: config.database.host,
        user: config.database.user,
        password: config.database.password,
        database: config.database.dbname,
        port: config.database.port,
        multipleStatements: true,
    })

    pool.getConnection((err, connection) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.')
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.')
            }
            if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.')
            }
        }
        else console.log("[DATABASE]: Connected successfuly")
        if (connection) connection.release()
    })
})()


function query(sql, placeholder) {
    return new Promise((resolve, reject)=>{
        pool.getConnection((error, conn) => {
            if(error) return reject(get_error(error.code))
            conn.query(sql, placeholder, (err, res)=>{
                conn.release();
                if(err)  {
                    console.log(err)
                    return reject(get_error(err.code))
                }
                ///if ( sql[0] === 'S' && res.length === 0) return reject(new NotFoundError("Not Found")) 
                resolve(res);
            });
        })
    });
}


function get_error(code){
    switch (code) {
        case 'ER_DUP_ENTRY':
            return new DuplicateError("Duplicate")

        case 'ER_NO_SUCH_TABLE':
            return new APIError("No such table", 500, "Missing database structure")
    
        default:
            return new DatabaseError("Unknown Error: " + code)
    }
}

module.exports = query

