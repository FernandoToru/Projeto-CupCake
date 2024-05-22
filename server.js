const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Configura a pasta 'public' para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para a API de produtos
app.get('/api/products', (req, res) => {
    res.json([
        { id: 1, name: 'Chocolate Cupcake', price: 3.5 },
        { id: 2, name: 'Vanilla Cupcake', price: 3.0 },
        { id: 3, name: 'Red Velvet Cupcake', price: 4.0 },
        { id: 4, name: 'Strawberry Cupcake', price: 3.5 },
    ]);
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
