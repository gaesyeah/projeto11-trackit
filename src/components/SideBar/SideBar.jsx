import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import logOutIcon from "./../../assets/logOutIcon.png";
import { StyledHistory, StyledList, StyledListCheck, StyledSideBar } from "./styled";

const SideBar = ({name}) => {

    const {image, showSideBar, setShowSideBar} = useContext(DataContext);

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
                <h1>{name}</h1>
                <img src={image} alt='userImg'/>
            </div>
            <div onClick={logOut}>
                <p>LogOut</p>
                <img src={logOutIcon} alt='logOut'/>
            </div>
            {pathname !== '/habitos'
                &&
                <div onClick={() => changeRoute('/habitos')}>
                    <p>Hábitos</p>
                    <StyledList />
                </div>
            }
            {pathname !== '/hoje'
                &&
                <div onClick={() => changeRoute('/hoje')}>
                    <p>Hoje</p>
                    <StyledListCheck />
                </div>
            }
            {pathname !== '/historico'
                &&
                <div onClick={() => changeRoute('/historico')}>
                    <p>Histórico</p>
                    <StyledHistory />
                </div>
            }
        </StyledSideBar>
    );
}

export default SideBar;