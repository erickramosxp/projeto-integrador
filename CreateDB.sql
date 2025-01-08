create database projeto_integrador;

use projeto_integrador;

create table produto (
	id int not null auto_increment primary key,
	nome varchar(255) not null,
    codigo_de_barras varchar(255),
    descricao text not null,
    estoque int,
    categoria enum("eletronicos", "alimentos", "vestuário", "outros") not null,
    data_validade varchar(255),
    imagem_produto_url varchar(255)
);

create table fornecedor(
	id int not null auto_increment primary key,
    nome_empresa varchar(255) not null,
    cnpj varchar(255) not null,
    endereco text not null,
    telefone varchar(255) not null,
    email varchar(255) not null,
    nome_contato_principal varchar(255) not null
);

create table fornecedor_produto (
	id int not null auto_increment primary key,
    idProduto int not null,
    idFornecedor int not null,
    foreign key(idProduto) references produto(id),
    foreign key(idFornecedor) references fornecedor(id)
);




