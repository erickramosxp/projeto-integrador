const express = require('express');
const produtoController = require('../controllers/produtoController');

const router = express.Router();

router.post('/produtos', produtoController.createProduct);
router.get('/produtos', produtoController.getAllProducts);
router.get('/produtos/:id', produtoController.getProductById);
router.put('/produtos/:id', produtoController.updateProduct);
router.delete('/produtos/:id', produtoController.deleteProduct);

module.exports = router;