"use client"

import { Container } from "@/components/Style"
import Header from "@/components/Header"
import styled from "styled-components"
import FormRegisterProduct from "@/components/FormRegisterProduct"
import { useState } from "react"

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

export default function Produtos() {
    const [modal, setModal] = useState(false);

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
        </Container>
    )
}