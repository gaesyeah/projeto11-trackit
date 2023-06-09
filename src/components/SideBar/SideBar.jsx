import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { customConfirmSwal } from "../../constants";
import { BooleanContext } from "../../contexts/BooleanContext";
import { UserContext } from "../../contexts/UserContext";
import logOutIcon from "./../../assets/logOutIcon.png";
import { StyledHistory, StyledList, StyledListCheck, StyledSideBar } from "./styled";

const SideBar = () => {

    const {showSideBar, setShowSideBar} = useContext(BooleanContext);
    const {name, image} = useContext(UserContext);

    const navigate = useNavigate();
    const {pathname} = useLocation();

    const logOut = () => {

        customConfirmSwal.icon = 'question';
        customConfirmSwal.title = '<span style=";font-size: 18px">Você realmente deseja sair?</span>';
        Swal.fire(customConfirmSwal)
        .then((result) => {
            
            if(result.isConfirmed){
                localStorage.removeItem('config');
                localStorage.removeItem('name');
                localStorage.removeItem('image');
        
                setShowSideBar(false);
                setTimeout(() => window.location.reload(), 200);
            }
        })
    };

    const changeRoute = (pathname) => {
        setShowSideBar(false);
        setTimeout(() => navigate(pathname), 400);
    };

    return (
        <StyledSideBar showSideBar={showSideBar}>
            <div>
                <h1>{name}</h1>
                <img src={image} alt={name}/>
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