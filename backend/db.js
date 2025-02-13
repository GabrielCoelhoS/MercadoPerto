const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE
});

client.connect()
  .then(() => console.log('Conectado ao banco de dados '))
  .catch((err) => console.error('Erro ao conectar ao banco de dados', err.stack));

const query = async (sql) => {
  try {
    const res = await client.query(sql);
    return res.rows;
  } catch (err) {
    console.error('Erro na consulta SQL', err.stack);
    throw err;
  }
};

module.exports = { query };
