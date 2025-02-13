const express = require('express');
const cors = require('cors');
const { query } = require('./db');

const app = express();
app.use(cors());

app.get('/produtos', async (req, res) => {
  try {
    const produtos = await query('SELECT * FROM produtos');
    res.json(produtos);
  } catch (err) {
    res.status(500).send('Erro na consulta ao banco de dados');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
