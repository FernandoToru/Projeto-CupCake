const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
const port = 3000;

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./database.db');

// Função para criar a tabela users
function createUsersTable() {
    db.serialize(() => {
        db.run('DROP TABLE IF EXISTS users');
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY,
            name TEXT,
            surname TEXT,
            cpf TEXT,
            phone TEXT,
            cell TEXT,
            email TEXT UNIQUE,
            password TEXT,
            address TEXT,
            number TEXT,
            complement TEXT,
            cep TEXT,
            district TEXT,
            state TEXT,
            city TEXT
        )`);
    });
}

// Criação das tabelas
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price REAL, description TEXT, imageUrl TEXT)');
    createUsersTable();
});

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON
app.use(express.json());

// Rota para cadastrar novos usuários
app.post('/register', (req, res) => {
    const { name, surname, cpf, phone, cell, email, password, address, number, complement, cep, district, state, city } = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        db.run(`INSERT INTO users (name, surname, cpf, phone, cell, email, password, address, number, complement, cep, district, state, city) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, surname, cpf, phone, cell, email, hash, address, number, complement, cep, district, state, city], function(err) {
            if (err) {
                return res.status(500).send("Failed to register user.");
            }
            res.send("User registered successfully.");
        });
    });
});

// Rota para login de usuários
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
        if (err || !user) {
            return res.status(401).send("User not found.");
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if (result) {
                res.send("Login successful.");
            } else {
                res.status(401).send("Password is incorrect.");
            }
        });
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
