const express = require('express');
const cros = require('cors');
const app = express();
const db = require('C:/Users/Italo/Documents/meu-projeto/db.js');

app.use(cros());
app.get('/', (req, res) => {
  db.query('SELECT * FROM produtos', (err, results) => {
    if (err) {
      return res.status(500).send('Erro na consulta ao banco de dados');
    }
    res.json(results);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
