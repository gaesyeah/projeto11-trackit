import styled from "styled-components";
import { ChevronDownCircle } from "styled-icons/boxicons-solid";

export const NavContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 3;
    position: fixed;
    transition: 300ms ease-out;
    top: ${({showSideBar}) => !showSideBar ? '0' : '-74px'};
    left: 0;
    width: 100%;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    h3{
        margin-left: 12px;
        font-family: 'Playball', cursive;
        font-size: 39px;
        line-height: 49px;
        color: #FFFFFF;
    }
    div{
        margin-right: 10px;
        display: flex;
        align-items: center;
        img{
            position: relative;
            width: 51px;
            height: 51px;
            border-radius: 100%;
            margin-left: 10px;
        }
    }
`;

export const StyledArrow = styled(ChevronDownCircle)`
    position: absolute;
    color: #FFFFFF;
    cursor: pointer;
    height: 23px;
    width: 23px;
    border-radius: unset;
    right: 0;
    bottom: 0;
    margin: 6px;
    background-color: #126BA5;
    border-radius: 100%;
    transition: 500ms;
    &:hover{
        color: #52B6FF;
    }
`;