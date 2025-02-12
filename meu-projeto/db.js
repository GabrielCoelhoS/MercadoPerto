// db.js
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: '127.0.0.1:8080', // ou 'localhost'
    user: 'Italo',
    password: 'Informatica25',
    database: 'gerenciamento_mercado_perto'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados!');
});

module.exports = connection;

