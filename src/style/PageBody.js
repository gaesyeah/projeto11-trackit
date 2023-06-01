import styled from "styled-components";

export const PageBody = styled.div`
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    background: #E5E5E5;
    padding: 70px 0 70px 0;
    font-family: 'Lexend Deca', sans-serif;
    h2{
        margin-top: 30px;
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
    }
    h1{
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
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
    width: 340px;
    text-align: start;
    h1{
        margin-top: 17px;
    }
`