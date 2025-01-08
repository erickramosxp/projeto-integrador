"use client"

import { Container } from "@/components/Style"
import Header from "@/components/Header"
import FormRegisterSupplier from "@/components/FormRegisterSupplier"
import { useState } from "react";
import styled from "styled-components";
import { supplierService } from "@/service/supplierService"
import useSWR from "swr"

const Menu = styled.div`
    ul {
        display: flex;
        justify-content: center;
    }
    li {
        background-color: #6a6af0;
        padding: 6px;
        border-radius: 5px;
        color: aliceblue;
        &:hover{
            cursor: pointer;
            background-color: #7575f1;
        }
    }
`

const fetcher = async () => {
    const response = await supplierService.getAll();
    return response;
  };

export default function Fornecedores() {
    const [modal, setModal] = useState(false);

        // const [fornecedores, setFornecedores] = useState('');
    
        const {data: fornecedores , error } = useSWR('fornecedores', fetcher, {
            revalidateOnFocus: false,
            dedupingInterval: 60000, 
        })
    
        if (error) console.log(error);
        if (fornecedores) console.log(fornecedores);

    return (
        <Container>
            <Header />
            <h1>Fornecedor</h1>
            <Menu>
                <ul>
                    <li onClick={() => setModal(true)}>Cadastrar Fornecedor</li>
                </ul>
            </Menu>
            {modal &&
            <FormRegisterSupplier setModal={setModal}/>}
            {fornecedores && fornecedores.map((fornecedor: any) =>
            <div key={fornecedor.id}>{fornecedor.nome_empresa}</div>)}
        </Container>
    )
}