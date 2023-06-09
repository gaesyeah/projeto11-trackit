import styled from "styled-components";

export const PageBody = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    overflow: ${({showSideBar}) => !showSideBar ? 'unset' : 'hidden'};
    width: 340px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 100vw;
    min-height: 100vh;
    background: #E5E5E5;
    transition: padding-top 300ms ease-out, padding-bottom 300ms ease-out;
    padding-top: ${({showSideBar}) => !showSideBar ? '70px' : '0px'};
    padding-bottom: ${({showSideBar}) => !showSideBar ? '102px' : '0px'};
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

`;

export const NullLoading = styled.div`
    background-color: #FFFFFF;
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 150px;
    }
`;

export const H2Formater = styled.div`
    h2{
        text-transform: capitalize;
    }
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