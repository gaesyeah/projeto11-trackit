import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root {
        color-scheme: light only;
    }
    body{
        display: flex;
        justify-content: center;
    }
    *{
        overflow-x: 0;
        box-sizing: border-box;
        user-select: none;
    }
    form{
        display: flex;
        flex-direction: column;
        row-gap: 6px;
    }
    input{
        padding-left: 11px;
        user-select: text;
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        &:disabled{
            cursor: default;
            opacity: 0.5;
            background: #F2F2F2;
        }
        &::placeholder{
            color: #DBDBDB;
        }
    }
    button{
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 303px;
        height: 45px;
        border-radius: 5px;
        border: none;
        background: #52B6FF;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 21px;
        line-height: 26px;
        color: #FFFFFF;
        &:disabled{
            cursor: default;
            opacity: 0.5;
        }
    }
    //-------------
    body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1); /* Cor da tonalidade escura */
        pointer-events: none;
        z-index: 9999;
        display: none; /* Inicialmente oculto */
    }

    @media (prefers-color-scheme: dark) {
        body::before {
            display: block; /* Exibir apenas quando o tema escuro estiver ativado */
        }
    }
`;
export default GlobalStyle;
