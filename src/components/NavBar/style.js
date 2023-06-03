import styled from "styled-components";

export const NavContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    z-index: 1;
    position: fixed;
    transition-duration: 250ms;
    top: ${({showSideBar}) => !showSideBar ? '0' : '-74px'};
    left: 0;
    width: 100%;
    height: 70px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    div:first-child{
        display: flex;
        align-items: center;
        margin-left: 10px;
        img{
            cursor: pointer;
            height: 32px;
            width: 32px;
            border-radius: unset;
        }
        h3{
            margin-left: 12px;
            font-family: 'Playball', cursive;
            font-size: 39px;
            line-height: 49px;
            color: #FFFFFF;
        }
    }
    div{
        margin-right: 10px;
        display: flex;
        align-items: center;
        img{
            width: 51px;
            height: 51px;
            border-radius: 100%;
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