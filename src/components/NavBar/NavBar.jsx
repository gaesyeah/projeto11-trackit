import { useNavigate } from "react-router-dom";
import { NavContainer } from "./style";

const NavBar = ({image}) => {

    const navigate = useNavigate();

    return (
        <NavContainer data-test="header">
            <h3 onClick={() => navigate('/')}>TrackIt</h3>
            <img 
                src={image} 
                alt='userImg'
                data-test="avatar"
            />
        </NavContainer>
    );
};

export default NavBar;