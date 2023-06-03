import styled from "styled-components";

export const FooterContainer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    z-index: 1;
    position: fixed;
    transition-duration: 400ms;
    bottom: ${({showSideBar}) => !showSideBar ? '0' : '-100px'};
    left: 0;
    width: 100%;
    height: 70px;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    line-height: 22px;
    a {
        color: #52B6FF;
        text-decoration-line: none;
    }
    div {
        cursor: pointer;
        width: 91px;
        padding-bottom: 40px;
    }
`;