import { useNavigate } from "react-router-dom";
import { NavContainer } from "./style";

const NavBar = ({image}) => {

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem('config');
        localStorage.removeItem('image');

        navigate('/');
    }

    return (
        <NavContainer data-test="header">
            <h3 onClick={logOut}>TrackIt</h3>
            <img 
                src={image} 
                alt='userImg'
                data-test="avatar"
            />
        </NavContainer>
    );
};

export default NavBar;