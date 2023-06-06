import styled from "styled-components";

export const SignBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #FFFFFF;
    width: 100vw;
    height: 100vh;
    h1{
        font-family: 'Playball', cursive;
        font-size: 69px;
        line-height: 86px;
        color: #126BA5;
        margin-bottom: 44px;
        margin-top: 4px;
    }
    img{
        width: 155px;
    }
    a{
        font-family: 'Lexend Deca', sans-serif;
        margin-top: 25px;
        font-size: 14px;
        line-height: 17px;
        color: #52B6FF;
    }
    button{
        width: 303px;
        height: 45px;
        margin-bottom: 12px;
    }
`;

export const StyledInputFile = styled.div`
    input{
        display: none;
    }
    label{
        cursor: pointer;
        overflow-y: auto;
        width: 303px;
        height: 45px;
        display: inline-block;
        border-radius: 5px;
        border: 1px solid #D5D5D5;
        background-color: ${({seted}) => seted ? '#D5D5D5' : '#FFFFFF'};
        p{
            margin-top: 10px;
            margin-left: 10px;
            color: ${({seted}) => seted ? '#FFFFFF' : '#E6E6E6'};
            font-family: 'Lexend Deca', sans-serif;
            font-size: 20px;
            line-height: -20px;
        }
    }
`;