import { useState } from "react"
import styled from "styled-components"
import { supplierService } from "@/service/supplierService"

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

export default function FormRegisterSupplier({setModal}: { setModal: (value: boolean) => void }) {

    const [fornecedor, setItemFornecedor] = useState({
        nome_empresa:"",
        cnpj:"",
        endereco:"",
        telefone:"",
        email:"",
        nome_contato_principal:""
    });

    const handleSetItem = (input: string, value: string | number) => {
        setItemFornecedor((prevfornecedor) => ({...prevfornecedor, [input]: value}))
    }

    const handleSubmitProduct = (e: any) => {
        e.preventDefault();
        if (!validFields()) {
            return ;
        }
        supplierService.create(fornecedor).then(res=> {console.log(res);
        for (let element in fornecedor) {
            handleSetItem(element, "");
        }
        }
    ).catch(err => console.log(err))
    }

    const validFields = () => {
        if (fornecedor.nome_empresa.length == 0) {
            alert("O nome da empresa é obrigatório!")
            return false;
        } 
        if (fornecedor.cnpj.length === 0) {
            alert("O CNPJ é obrigatório!")
            return false;
        }
        if (fornecedor.endereco.length === 0) {
            alert("O endereço é obrigatorio!")
            return false;
        }
        if (fornecedor.telefone.length === 0) {
            alert("O número de telefone é obrigatorio!")
            return false;
        }
        if (fornecedor.email.length === 0) {
            alert("O e-mail é obrigatorio!")
            return false;
        }
        if (fornecedor.nome_contato_principal.length === 0) {
            alert("O nome do contato é obrigatorio!")
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
                    <label htmlFor="">Nome da Empresa:</label>
                    <input value={fornecedor.nome_empresa} onChange={(e) => handleSetItem('nome_empresa', e.target.value)} type="text" />
                </div>
                <div>
                    <label htmlFor="">CNPJ:</label>
                    <input value={fornecedor.cnpj} onChange={(e) => handleSetItem('cnpj', e.target.value)} type="text" />
                </div>
                <div>
                    <label htmlFor="">Endereço:</label>
                    <input value={fornecedor.endereco} onChange={(e) => handleSetItem('endereco', e.target.value)} type="text" />
                </div>
                <div>
                    <label htmlFor="">Telefone:</label>
                    <input value={fornecedor.telefone} onChange={(e) => handleSetItem('telefone', e.target.value)} type="text" />
                </div>
                <div>
                    <label htmlFor="">E-mail:</label>
                    <input value={fornecedor.email} onChange={(e) => handleSetItem('email', e.target.value)} type="text" />
                </div>
                <div>
                    <label htmlFor="">Contato Principal:</label>
                    <input value={fornecedor.nome_contato_principal} onChange={(e) => handleSetItem('nome_contato_principal', e.target.value)} type="text" />
                </div>
            <Button onClick={(e) => handleSubmitProduct(e)}>Cadastrar</Button>
            </Forms>
        </Container>
    )
}