import styled from "styled-components";
import { List, ListCheck } from "styled-icons/fa-solid";
import { History } from "styled-icons/material-rounded";

export const StyledSideBar = styled.aside`
    transition: 400ms;
    z-index: 2;
    position: fixed;
    right: ${({showSideBar}) => !showSideBar ? '-100%' : '0'};
    max-width: 60%;
    height: 100%;
    background: #126BA5;
    box-shadow: 0px 60px 60px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    div:nth-child(1){
        min-width: 114px;
        height: 52px;
        background: linear-gradient(to left, #0b4c78, #126BA5);
        &:hover{
            cursor: default;
            background: linear-gradient(to left, #0b4c78, #126BA5);
        }
        h1{
            overflow-x: auto;
            overflow-y: hidden;
            color: #FFFFFF;
            white-space: pre;
            font-size: 26px;
            line-height: 32px;
            margin: 0 52px 3px 8px;
        }
        img{
            transform: rotate(360deg);
            width: 40px;
            height: 40px;
            border-radius: 100%;
            margin-right: 8px;
        }
    }
    div:nth-child(2){
        height: 34px;
        background: linear-gradient(to left, #0b4c78, #126BA5);
    }
    div{
        height: 34px;
        color: #E5E5E5;
        display: flex;
        padding: 5px 0 5px 0;
        align-items: center;
        border-bottom: 2px solid ;
        border-image: linear-gradient(to left, #FFFFFF, transparent) 1;
        &:hover{
            background: linear-gradient(to left, #52B6FF, #126BA5);
            cursor: pointer;
        }
        img{
            transform: rotate(180deg);
            width: 21px;
            height: 21px;
            right: 0;
            position: absolute;
            margin-right: 4px;
        }
        p{
            position: absolute;
            right: 0;
            margin-right: 32px;
            color: #FFFFFF;
            margin-left: 4px;
            font-size: 18px;
            line-height: 22px;
            font-family: 'Lexend Deca', sans-serif;
        }
    }
`;

export const StyledListCheck = styled(ListCheck)`
    color: #FFFFFF;
    margin-right: 4px;
    width: 22px;
    height: 22px;
    right: 0;
    position: absolute;
`;

export const StyledList = styled(List)`
    color: #FFFFFF;
    margin-right: 4px;
    width: 22px;
    height: 22px;
    right: 0;
    position: absolute;
`;

export const StyledHistory = styled(History)`
    color: #FFFFFF;
    width: 27px;
    height: 27px;
    margin: -100% 3px -100% -2px;
    right: 0;
    position: absolute;
`;