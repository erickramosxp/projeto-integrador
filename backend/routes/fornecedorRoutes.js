const express = require('express');
const router = express.Router();
const fornecedorController = require('../controllers/fornecedorController')


router.post('/fornecedor', fornecedorController.CreateFornecedor);
router.get('/fornecedor', fornecedorController.getAllFornecedores);
router.get('/fornecedor/:id', fornecedorController.getFornecedoresById);
router.put('/fornecedor/:id', fornecedorController.updateFornecedor);
router.delete('/fornecedor/:id', fornecedorController.deleteFornecedor);

module.exports = router;
