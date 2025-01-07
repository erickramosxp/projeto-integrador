const db = require('../config/db')

exports.createProduct = (req, res) => {
    const {nome, codigo_de_barras, descricao, estoque, categoria, data_validade, imagem_produto_url} = req.body;

    const query = `
        INSERT INTO produto (nome, codigo_de_barras, descricao, estoque, categoria, data_validade, imagem_produto_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    db.execute(query, [nome, codigo_de_barras, descricao, estoque, categoria, data_validade, imagem_produto_url || null], (err, results) => {
        if (err) {
            return res.status(500).json({err: err});
        }
        res.status(201).json({id: results.insertId, ...req.body})
    })
}

exports.getAllProducts = (req,res) => {
    const query = `SELECT * from produto`

    db.execute(query, (err, results) => {
        if (err) {
            return res.status(500).json({message: "Erro ao buscar produtos"})
        }
        res.status(200).json(results);
    });
}

exports.getProductById = (req, res) => {

    const { id } = req.params;

    const query = `SELECT * from produto WHERE id = ?`;

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({message: "Erro ao buscar produto"})
        }
        if (results.length === 0) {
            return res.status(404).json({message: "Produto não encontrado"})
        }
        return res.status(200).json(results[0]);
    })
}

exports.updateProduct = (req, res) => {
    const { id } = req.params;

    const {nome, codigo_de_barras, descricao, estoque, categoria, data_validade, imagem_produto_url} = req.body;

    let updates = {}
    if (nome) updates['nome'] = nome;
    if (codigo_de_barras) updates['codigo_de_barras'] = codigo_de_barras;
    if (descricao) updates['descricao'] = descricao;
    if (estoque) updates['estoque'] = estoque;
    if (categoria) updates['categoria'] = categoria;
    if (data_validade) updates['data_validade'] = data_validade;
    if (imagem_produto_url) updates['imagem_produto_url'] = imagem_produto_url;

    const query = `UPDATE produto SET ? WHERE id = ?`;
    const values = [updates, id];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).json({message: "Erro ao atualizar produto"});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({message: "Produto não encontrado"});
        }

        res.status(200).json({message: "Produto atualizado com sucesso"});
    })
}

exports.deleteProduct = (req, res) => {
    const {id} = req.params;

    const query = `DELETE FROM produto WHERE id = ?`;

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({message: "Erro ao deletar produto"});
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({message: "Produto não encontrado"})
        }
        return res.status(200).json({message: "Produto deletado com sucesso"})
    })
}