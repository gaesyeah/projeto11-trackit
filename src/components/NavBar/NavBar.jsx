import { useNavigate } from "react-router-dom";
import logOutIcon from "./../../assets/logOutIcon.png";
import { NavContainer } from "./style";

const NavBar = ({image, name}) => {

    const navigate = useNavigate();

    const logOut = () => {
        if(confirm('Você realmente deseja sair?')){
            localStorage.removeItem('config');
            localStorage.removeItem('image');
            localStorage.removeItem('name');
    
            navigate('/');
            window.location.reload();
        }
    }

    return (
        <NavContainer data-test="header">
            <div>
                <img 
                    onClick={logOut} 
                    src={logOutIcon} 
                    alt='logOut'
                />
                <h3>TrackIt</h3>
            </div>
            <div>
                <p>{name}</p>
                <img 
                    src={image} 
                    alt='userImg'
                    data-test="avatar"
                />
            </div>
        </NavContainer>
    );
};

export default NavBar;