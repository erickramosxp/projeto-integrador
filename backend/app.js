const express = require('express');
const bodyParser = require('body-parser');
const produtosRoutes = require('./routes/produtoRoutes')
const fornecedorRoutes = require('./routes/fornecedorRoutes');
const fornecedorProdutoRoutes = require('./routes/fornecedorProdutoRoutes');

const app = express();
const PORT = 3000;


app.use(bodyParser.json());
app.use('/api', produtosRoutes);
app.use('/api', fornecedorRoutes);
app.use('/api', fornecedorProdutoRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}/`);
});