const mysql = require('mysql2');

require('dotenv').config();

const db = mysql.createConnection({
    host:  process.env.DB_HOSTPROJECT,
    user: process.env.DB_USERPROJECT,
    password: process.env.DB_PASSWORDPROJECT,
    database: process.env.DB_NAMEPROJECT,
    port: process.env.DB_PORT
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

module.exports = db;