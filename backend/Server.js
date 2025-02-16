const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const db = require("C:/Users/Italo/Documents/Meu_projeto/Servidor/db.js");

app.use(cors());
app.use(express.json()); // Para parsear JSON no corpo da requisição

// Consulta de dados do BD
app.get('/lojas', (req, res) => {
    db.query('SELECT * FROM lojas', (err, results) => {
        if (err) {
            return res.status(500).send('Erro na consulta ao banco de dados');
        }
        res.json(results);
    });
});

app.get('/usuario', (req, res) => {
    db.query('SELECT * FROM usuario', (err, results) => {
        if (err) {
            return res.status(500).send('Erro na consulta ao banco de dados');
        }
        res.json(results);
    });
});

app.get('/produtos', (req, res) => {
    db.query('SELECT * FROM produtos', (err, results) => {
        if (err) {
            return res.status(500).send('Erro na consulta ao banco de dados');
        }
        res.json(results);
    });
});

app.get('/venda', (req, res) => {
    db.query('SELECT * FROM venda', (err, results) => {
        if (err) {
            return res.status(500).send('Erro na consulta ao banco de dados');
        }
        res.json(results);
    });
});

app.get('/venda_item', (req, res) => {
    db.query('SELECT * FROM venda_item', (err, results) => {
        if (err) {
            return res.status(500).send('Erro na consulta ao banco de dados');
        }
        res.json(results);
    });
});

// Inserção de dados no BD
app.post('/loja-input', (req, res) => {
    const { nome_loja, razao_social, estado, cidade, bairro, endereco, cnpj, telefone, cep, numero_endereco, complemento } = req.body;

    if (!nome_loja || !razao_social || !estado || !cidade || !bairro || !endereco || !cnpj || !telefone || !cep || !numero_endereco) {
        return res.status(400).send('Todos os campos são obrigatórios');
    }

    const sqlInsert = 'INSERT INTO lojas SET ?';
    db.query(sqlInsert, { nome_loja, razao_social, estado, cidade, bairro, endereco, cnpj, telefone, cep, numero_endereco, complemento }, (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            return res.status(500).send('Erro ao inserir dados');
        }
        res.status(201).send('Dados inseridos com sucesso');
    });
});



app.post('/produtos-input', (req, res) => {
    const produto = req.body;

    const sqlInsert = 'INSERT INTO produtos SET ?';
    db.query(sqlInsert, produto, (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            return res.status(500).send('Erro ao inserir dados');
        }
        res.status(201).send('Dados inseridos com sucesso');
    });
});

app.post('/usuario-input', (req, res) => {
    const usuario = req.body;

    const sqlInsert = 'INSERT INTO usuario SET ?';
    db.query(sqlInsert, usuario, (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados:', err);
            return res.status(500).send('Erro ao inserir dados');
        }
        res.status(201).send('Dados inseridos com sucesso');
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
