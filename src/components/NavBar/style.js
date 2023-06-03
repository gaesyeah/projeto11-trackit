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
    div:first-child{
        display: flex;
        align-items: center;
        margin-left: 10px;
        img{
            cursor: pointer;
            border-radius: unset;
            height: 27px;
            width: 27px;
            transform: rotate(180deg);
        }
        h3{
            margin-left: 12px;
            font-family: 'Playball', cursive;
            font-size: 38.982px;
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