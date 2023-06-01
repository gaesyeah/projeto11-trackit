import { useNavigate } from "react-router-dom";
import { NavContainer } from "./style";

const NavBar = ({image}) => {

    const navigate = useNavigate();

    return (
        <NavContainer>
            <h3 onClick={() => navigate('/')}>TrackIt</h3>
            <img src={image} alt='userImg' />
        </NavContainer>
    );
};

export default NavBar;