const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
const port = 3000;

// Conexão com o banco de dados SQLite
const db = new sqlite3.Database('./database.db');

// Criação das tabelas
db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY, name TEXT, price REAL, description TEXT, imageUrl TEXT)');
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        name TEXT,
        cpf TEXT,
        phone TEXT,
        email TEXT UNIQUE,
        password TEXT,
        address TEXT
    )`);
});

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para parsear JSON
app.use(express.json());

// Rota para obter todos os produtos
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});

// Rota para obter um produto pelo ID
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(row);
        }
    });
});

// Rota para cadastrar novos produtos
app.post('/api/products', (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    db.run('INSERT INTO products (name, price, description, imageUrl) VALUES (?, ?, ?, ?)', [name, price, description, imageUrl], function(err) {
        if (err) {
            return res.status(500).send("Failed to add product.");
        }
        res.send("Product added successfully.");
    });
});

// Rota para cadastro de usuários
app.post('/register', (req, res) => {
    const { name, cpf, phone, email, password, address } = req.body;
    bcrypt.hash(password, saltRounds, function(err, hash) {
        db.run('INSERT INTO users (name, cpf, phone, email, password, address) VALUES (?, ?, ?, ?, ?, ?)',
        [name, cpf, phone, email, hash, address], function(err) {
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
