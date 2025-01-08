import { useState } from "react"
import styled from "styled-components"
import { productService } from "@/service/productService"

const Container = styled.div`
    width: 90%;
    margin: auto;
    margin-top: 20px;
    `

const Forms = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: start;
    padding: 20px 20px 50px 20px;
    margin-top: 20px;
    margin: auto;
    width: 80%; 
    border: 1px solid black;
    border-radius: 5px;
    div {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px
    }
    label {
        width: 12rem;
        text-align: start;
    }
    input {
        border: 1px solid;
        border-radius: 2px;
        width: 30.2rem;
        padding: 2px 5px;
    }
    select {
        border: 1px solid;
        border-radius: 2px;
        padding: 2px 5px;
    }
`

const Button = styled.button`
    background-color: #6a6af0;
    padding: 6px;
    border-radius: 5px;
    color: aliceblue;
    margin: auto;
    &:hover{
        cursor: pointer;
        background-color: #7575f1;
    }
`

const Exit = styled.div`
    margin-left: 5px;
    button {
        background-color: #a51010;
        padding: 2px 8px;
        border-radius: 5px;
        color: #cacfd3;
        &:hover{
            background-color: #cf0707;
        }
    }
`

export default function FormRegisterProduct({setModal}: { setModal: (value: boolean) => void }) {

    const [categoriaSelecionada, setCategoria] = useState('selecione');
    const [produto, setItemProduto] = useState({
        nome:"",
        codigo_de_barras:"",
        descricao:"",
        estoque:0,
        categoria:"",
        data_validade:"",
        imagem_produto_url:""
    });

    const handleSetItem = (input: string, value: string | number) => {
        setItemProduto((prevProduto) => ({...prevProduto, [input]: value}))
    }

    const handleSubmitProduct = (e: any) => {
        e.preventDefault();
        if (!validFields()) {
            return ;
        }
        console.log(produto);
        productService.create(produto).then(res=> console.log(res)).catch(err => console.log(err))
    }

    const validFields = () => {
        if (produto.nome.length == 0) {
            alert("O campo nome é obrigatorio!")
            return false;
        } 
        if (produto.descricao.length === 0) {
            alert("A descrição não pode estar em branco!")
            return false;
        }
        if (produto.categoria.length === 0 || produto.categoria === 'selecione') {
            alert("Necessario selecionar uma categoria!")
            return false;
        }
        return true;
    }
    return (
        <Container>
            <Forms>
                <Exit>
                    <button onClick={() => setModal(false)}>X</button>
                </Exit>
                <div>
                    <label htmlFor="">Nome do Produto:</label>
                    <input onChange={(e) => handleSetItem('nome', e.target.value)} type="text" />
                </div>
                <div>
                    <label htmlFor="">Código de Barras:</label>
                    <input onChange={(e) => handleSetItem('codigo_de_barras', e.target.value)} type="text" />
                </div>
                <div>
                    <label htmlFor="">Descrição:</label>
                    <input onChange={(e) => handleSetItem('descricao', e.target.value)} type="text" />
                </div>
                <div>
                    <label htmlFor="">Quantidade em Estoque:</label>
                    <input onChange={(e) => handleSetItem('estoque', e.target.value)} type="number" />
                </div>
                <div>
                    <label htmlFor="">Categoria:</label>
                    <select value={categoriaSelecionada} onChange={(e) => {setCategoria(e.target.value); handleSetItem('categoria', e.target.value)}} name="" id="">
                        <option value={"selecione"} disabled>Selecione uma categoria</option>
                        <option value="eletronicos">Eletrônicos</option>
                        <option value="alimentos">Alimentos</option>
                        <option value="vestuario">Vestuário</option>
                        <option value="outros">Outros</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="">Data de Validade:</label>
                    <input onChange={(e) => handleSetItem('data_validade', e.target.value)} type="date" />
                </div>
                <div>
                    <label htmlFor="">URL da Imagem do Produto:</label>
                    <input onChange={(e) => handleSetItem('imagem_produto_url', e.target.value)} type="text" />
                </div>
            <Button onClick={(e) => handleSubmitProduct(e)}>Cadastrar</Button>
            </Forms>
        </Container>
    )
}