const mysql = require('mysql');
const util = require('util'); //Para trabajar de manera asincrona con ls peticiones de la BD

//conexion
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pokemon'
});


//El metodo query ejecuta las promesas - todo lo que regresa van a ser promesas
pool.query = util.promisify(pool.query);
//para exportar la conexion a cualquier archivo
module.exports = pool;