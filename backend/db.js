const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados', err.stack);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

const query = async (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Erro na consulta SQL', err.stack);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

module.exports = { query };