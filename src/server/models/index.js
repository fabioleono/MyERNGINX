require('dotenv').config()
const mysql = require('mysql')
const { promisify } = require('util')

const database = {
  host: "localhost",
  user: "enable",
  password: process.env.DB_PASSWORD,
  database: "enable_gncv2",
  multipleStatements: true
}; 
// !!--- MODELO A . con el metodo createConnection()
// const mysqlConnection = mysql.createConnection(database)
// mysqlConnection.connect((err, connection) => {
//   if(err){
//     console.log('Error DataBase ', err);
    
//   }
//   if (connection){
//     console.log('Database is Conected. Metodo createConnection');
    
//   }
// }); 

// module.exports = mysqlConnection
// ---!!

// !! --- MODELO B. con el metodo createPool()

const pool = mysql.createPool(database) // este metodo pool no soporta promesas, asi que para aplicar ASYNC AWAIT es necesario utilizar un modulo de node llamado util y su metodo promisify

pool.getConnection((err, connection) => {
  if(err){
    console.error(err);
    
    switch (err.code) {
      case "PROTOCOL_CONNECTION_LOST":
        console.error("DATABASE CONNECTION WAS CLOSED");

        break;

      case "ER_CON_COUNT_ERROR":
        console.error("DATABASE HAS MANY CONNECTIONS");

        break;
      case "ECONNREFUSED":
        console.error("DATABASE CONNECTION WAS REFUSED");

        break;

        default:
        break;

    }
  }

  if(connection) {
    connection.release()
    console.log('Database enable_gncv2 is Connected. CreatePool Method ');
    
  }
  return
})

pool.query = promisify(pool.query) // convierte callbacks en promesas para los metodos query de pool
module.exports = pool

// ---!!
