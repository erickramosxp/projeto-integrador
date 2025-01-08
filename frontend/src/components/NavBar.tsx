import styled from "styled-components"
import Link from 'next/link';

const Nav = styled.nav`
    margin-top: 10px;
    ul {
        display: flex;
        list-style: none;
        justify-content: center;
        gap: 25px
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

export default function NavBar() {
    return (
        <Nav>
            <ul>
                <li><Link href="/fornecedores">Fornecedores</Link></li>
                <li><Link href="/produtos">Produtos</Link></li>
                <li><Link href="/associacao">Associaçoes</Link></li>
            </ul>
        </Nav>
    )
}