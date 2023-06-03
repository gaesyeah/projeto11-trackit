import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { List, ListCheck } from "styled-icons/fa-solid";
import { History } from "styled-icons/material-rounded";
import { DataContext } from "../../App";
import logOutIcon from "./../../assets/logOutIcon.png";

const SideBar = () => {

    const {image, name, showSideBar, setShowSideBar} = useContext(DataContext);

    const navigate = useNavigate();
    const {pathname} = useLocation();

    const logOut = () => {
        if(confirm('Vocẽ realmente deseja fazer logOut?')){
            localStorage.removeItem('config');
            localStorage.removeItem('name');
            localStorage.removeItem('image');
    
            window.location.reload();
        }
    }

    const changeRoute = (pathname) => {
        setShowSideBar(false);
        navigate(pathname);
    }

    return (
        <StyledSideBar showSideBar={showSideBar}>
            <div>
                <img src={image} alt='userImg'/>
                <p>{name}</p>
            </div>
            <div onClick={logOut}>
                <img src={logOutIcon} alt='logOut'/>
                <p>LogOut</p>
            </div>
            {pathname !== '/habitos'
                &&
                <div onClick={() => changeRoute('/habitos')}>
                    <StyledList />
                    <p>Hábitos</p>
                </div>
            }
            {pathname !== '/hoje'
                &&
                <div onClick={() => changeRoute('/hoje')}>
                    <StyledListCheck />
                    <p>Hoje</p>
                </div>
            }
            {pathname !== '/historico'
                &&
                <div onClick={() => changeRoute('/historico')}>
                    <StyledHistory />
                    <p>Histórico</p>
                </div>
            }
        </StyledSideBar>
    );
}

export default SideBar;

const StyledSideBar = styled.aside`
    *{
        transition-duration: 500ms;
    }
    z-index: 2;
    position: fixed;
    left: ${({showSideBar}) => !showSideBar ? '-45%' : '0'};
    transition-duration: 400ms;
    width: 45%;
    height: 100%;
    background: #126BA5;
    box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    div:nth-child(1){
        background: linear-gradient(to right, #0b4c78, #126BA5);
        :hover{
            cursor: default;
            background: linear-gradient(to right, #0b4c78, #126BA5);
        }
        p{
            font-size: 26px;
            margin-bottom: 3px;
        }
        img{
            width: 40px;
            height: 40px;
            border-radius: 100%;
        }
    }
    div:nth-child(2){
        background: linear-gradient(to right, #0b4c78, #126BA5);
    }
    div{
        color: #E5E5E5;
        display: flex;
        padding: 5px 0 5px 0;
        align-items: center;
        border-bottom: 2px solid ;
        border-image: linear-gradient(to right, #FFFFFF, transparent) 1;
        :hover{
            background: #52B6FF;
            cursor: pointer;
        }
        img{
            margin-left: 4px;
            width: 22px;
            height: 22px;
        }
        p{
            color: #FFFFFF;
            margin-left: 4px;
            font-family: 'Lexend Deca', sans-serif;
            font-size: 18px;
            line-height: 22px;
        }
    }
`;

const StyledListCheck = styled(ListCheck)`
    color: #FFFFFF;
    margin-left: 4px;
    width: 22px;
    height: 22px;
`;

const StyledList = styled(List)`
    color: #FFFFFF;
    margin-left: 4px;
    width: 22px;
    height: 22px;
`;

const StyledHistory = styled(History)`
    color: #FFFFFF;
    width: 27px;
    height: 27px;
    margin: -100% -3px -100% 2px;
`;