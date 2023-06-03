import styled from "styled-components";

export const PageBody = styled.div`
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100vw;
    min-height: 100vh;
    background: #E5E5E5;
    padding-top: 70px;
    font-family: 'Lexend Deca', sans-serif;
    h2{
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
    }
    h1{
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
    padding-bottom: 100px;
`;

export const NullLoading = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 150px;
    }
`;

export const H2Formater = styled.div`
    margin-top: 30px;
    width: 340px;
    text-align: start;
    h1{
        margin-top: 17px;
    }
    p{
        margin-top: 17px;
        font-size: 18px;
        color: #666666;
    }
`