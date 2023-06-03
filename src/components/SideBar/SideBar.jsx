import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import logOutIcon from "./../../assets/logOutIcon.png";
import { StyledHistory, StyledList, StyledListCheck, StyledSideBar } from "./styled";

const SideBar = () => {

    const {image, name, showSideBar, setShowSideBar} = useContext(DataContext);

    const navigate = useNavigate();
    const {pathname} = useLocation();

    const logOut = () => {
        if(confirm('Vocẽ realmente deseja sair?')){
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