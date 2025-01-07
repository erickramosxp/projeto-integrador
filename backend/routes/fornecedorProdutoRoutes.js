const express = require('express');
const router = express.Router();
const fornecedorProdutoController = require('../controllers/fornecedorProdutoController');

router.post('/fornecedor-produto', fornecedorProdutoController.addFornecedorProduto);
router.get('/fornecedor-produto/:idFornecedor', fornecedorProdutoController.getProdutosByFornecedor);
router.delete('/fornecedor-produto/:idFornecedor/:idProduto', fornecedorProdutoController.removeFornecedorProduto);
router.get('/produto-fornecedores/:idProduto', fornecedorProdutoController.getFornecedoresByProduto);

module.exports = router;