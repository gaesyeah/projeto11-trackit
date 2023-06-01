import styled from "styled-components";

export const NavContainer = styled.footer`
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    p{
        cursor: pointer;
        margin-left: 18px;
        font-family: 'Playball', cursive;
        font-size: 38.982px;
        line-height: 49px;
        color: #FFFFFF;
    }
    img{
        width: 51px;
        height: 51px;
        border-radius: 100%;
        margin-right: 10px;
    }
`;