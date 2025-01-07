const db = require('../config/db');

exports.CreateFornecedor = (req, res) => {
    const {nome_empresa, cnpj, endereco, telefone, email, nome_contato_principal} = req.body;

    const query = `INSERT INTO fornecedor SET ?`
    const values = {nome_empresa, cnpj, endereco, telefone, email, nome_contato_principal};

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).json({message: "Erro ao cadastrar fornecedor"})
        }
        return res.status(201).json({id: results.insertId ,...req.body});
    })
}

exports.getAllFornecedores = (req, res) => {
    const query = `SELECT * FROM fornecedor`;

    db.query(query, (err, results) => {
        if(err) {
            return res.status(500).json({message: "Erro ao listar fornecedores"})
        }
        return res.status(200).json(results);
    })
}


exports.getFornecedoresById = (req, res) => {
    const {id} = req.params;

    const query = `SELECT * FROM fornecedor WHERE id = ?`;

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({message: "Erro ao buscar fornecedor"});
        }
        if (results.length === 0) {
            return res.status(404).json({message: "Fornecedor não encontrado"});
        }
        return res.status(200).json(results[0]);
    })
};

exports.updateFornecedor = (req, res) => {
    const {id} = req.params;

    const {nome_empresa, cnpj, endereco, telefone, email, nome_contato_principal} = req.body;

    let updates = {};
    if (nome_empresa) updates['nome_empresa'] = nome_empresa;
    if (cnpj) updates['cnpj'] = cnpj;
    if (endereco) updates['endereco'] = endereco;
    if (telefone) updates['telefone'] = telefone;
    if (email) updates['email'] = email;
    if (nome_contato_principal) updates['nome_contato_principal'] = nome_contato_principal;

    const query = `UPDATE fornecedor SET ? WHERE id = ?`;
    const values = [updates, id];

    db.query(query, values, (err, results) => {
        if (err) {
            return res.status(500).json({message: "Erro ao atualizar fornecedor"})
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({message: "Fornecedor não encontrado"})
        }
        return res.status(200).json({message: "Fornecedor atualizado com sucesso"})
    })
}

exports.deleteFornecedor = (req, res) => {
    const {id} = req.params;

    const query = `DELETE FROM fornecedor WHERE id = ?`;

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({message: "Erro ao deletar fornecedor"})
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({message: "Fornecedor não encontrado"})
        }

        return res.status(200).json({message: "Fornecedor deletado com sucesso"});
    })
}
