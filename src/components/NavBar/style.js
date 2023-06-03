import styled from "styled-components";
import { ChevronDownCircle } from "styled-icons/boxicons-solid";

export const NavContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    position: fixed;
    transition-duration: 400ms;
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
        p{
            margin-right: 8px;
            color: #FFFFFF;
            font-family: 'Lexend Deca', sans-serif;
            font-size: 20px;
        }
        @media (max-width: 480px) {
            p {
                display: none;
            }
        }
    }
`;

export const StyledArrow = styled(ChevronDownCircle)`
    position: absolute;
    color: white;
    cursor: pointer;
    height: 21px;
    width: 21px;
    border-radius: unset;
    right: 0;
    bottom: 0;
    margin: 6px;
    background-color: #126BA5;
    border-radius: 100%;
`;