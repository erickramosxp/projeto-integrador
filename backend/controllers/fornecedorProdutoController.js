const db = require('../config/db');

exports.addFornecedorProduto = (req, res) => {
    const { idFornecedor, idProduto } = req.body;

    if (!idFornecedor || !idProduto) {
        return res.status(400).json({message: "Fornecedor e Produto são obrigatórios!"})
    }

    const query = 'INSERT INTO fornecedor_produto (idFornecedor, idProduto) VALUES (?, ?)';

    db.query(query, [idFornecedor, idProduto], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao associar fornecedor e produto' });
        }
        return res.status(201).json({ message: 'Fornecedor e produto associados com sucesso', id: results.insertId });
    })
}

exports.getProdutosByFornecedor = (req, res) => {
    const { idFornecedor } = req.params;

    if (!idFornecedor) {
        return res.status(400).json({ message: 'ID do fornecedor é obrigatório!' });
    }

    const query = `
        SELECT p.* 
        FROM produto p
        JOIN fornecedor_produto fp ON p.id = fp.idProduto
        WHERE fp.idFornecedor = ?
    `;

    db.query(query, [idFornecedor], (err, results) => {
        if (err) {
            console.error('Erro ao listar produtos do fornecedor:', err);
            return res.status(500).json({ message: 'Erro ao recuperar produtos do fornecedor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum produto encontrado para este fornecedor' });
        }
        return res.status(200).json(results);
    })
}

exports.getFornecedoresByProduto = (req, res) => {
    const { idProduto } = req.params;

    if (!idProduto) {
        return res.status(400).json({ message: 'ID do produto é obrigatório!' });
    }

    const query = `
        SELECT f.* 
        FROM fornecedor f
        JOIN fornecedor_produto fp ON f.id = fp.idFornecedor
        WHERE fp.idProduto = ?
    `;
    db.query(query, [idProduto], (err, results) => {
        if (err) {
            console.error('Erro ao listar fornecedores do produto:', err);
            return res.status(500).json({ message: 'Erro ao recuperar fornecedores do produto' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Nenhum fornecedor encontrado para este produto' });
        }
        return res.status(200).json(results);
    });
};

exports.removeFornecedorProduto = (req, res) => {
    const { idFornecedor, idProduto } = req.params;

    if (!idFornecedor || !idProduto) {
        return res.status(400).json({ message: 'Fornecedor e Produto são obrigatórios para remoção' });
    }

    const query = 'DELETE FROM fornecedor_produto WHERE idFornecedor = ? AND idProduto = ?';
    db.query(query, [idFornecedor, idProduto], (err, results) => {
        if (err) {
            console.error('Erro ao remover fornecedor-produto:', err);
            return res.status(500).json({ message: 'Erro ao remover a associação' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Associação não encontrada' });
        }
        return res.status(200).json({ message: 'Associação entre fornecedor e produto removida com sucesso' });
    });
};

