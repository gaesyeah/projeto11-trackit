import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    *{
        /* font-family: 'Lexend Deca', sans-serif;
        font-family: 'Playball', cursive; */

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
        &::placeholder{
            color: #DBDBDB;
        }
    }
    button{
        cursor: pointer;
        width: 303px;
        height: 45px;
        border-radius: 5px;
        border: none;
        background: #52B6FF;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 21px;
        line-height: 26px;
        color: #FFFFFF;
    }
`;
export default GlobalStyle;
