"use client"
import styled from "styled-components"
import NavBar from "./NavBar"
import { Container } from "./Style"


// const Container = styled.div`
//     width: 60%;
//     text-align: center;
//     h1{
//         font-size: 30px;
//     }
// `

export default function Header() {
    return (
    <Container>
        <h1>Sistema de Gestão</h1>
        <NavBar />
    </Container>
    )
}