import { useNavigate } from "react-router-dom";
import { FooterContainer } from "./style";

const NavBar = ({image}) => {

    const navigate = useNavigate();

    return (
        <FooterContainer>
            <p onClick={() => navigate('/')}>TrackIt</p>
            <img src={image} alt='userImg' />
        </FooterContainer>
    );
};

export default NavBar;