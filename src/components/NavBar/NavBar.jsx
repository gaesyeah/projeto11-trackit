import { useNavigate } from "react-router-dom";
import { NavContainer } from "./style";

const NavBar = ({image}) => {

    const navigate = useNavigate();

    return (
        <NavContainer>
            <p onClick={() => navigate('/')}>TrackIt</p>
            <img src={image} alt='userImg' />
        </NavContainer>
    );
};

export default NavBar;