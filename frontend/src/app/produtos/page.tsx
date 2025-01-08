"use client"

import { Container } from "@/components/Style"
import Header from "@/components/Header"
import styled from "styled-components"
import FormRegisterProduct from "@/components/FormRegisterProduct"
import { useState } from "react"
import { productService } from "@/service/productService"
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
    const response = await productService.getAll();
    return response;
  };

export default function Produtos() {
    const [modal, setModal] = useState(false);
    const {data: produtos, error} = useSWR("produtos", fetcher,{
        revalidateOnFocus: false,
        dedupingInterval: 60000, 
    })

    return (
        <Container>
            <Header />
            <h1>Produtos</h1>
            <Menu>
                <ul>
                    <li onClick={() => setModal(true)}>Cadastrar Produto</li>
                </ul>
            </Menu>
            {modal &&
            <FormRegisterProduct setModal={setModal}/>}
            {produtos && produtos.map( (produto: any) =>
            <div key={produto.id}>{produto.nome}</div>)}
        </Container>
    )
}