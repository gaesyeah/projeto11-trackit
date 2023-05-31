import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import { FooterContainer } from "./style";

const NavBar = () => {

    const navigate = useNavigate();

    console.log(useContext(DataContext));

    return (
        <FooterContainer>
            <p onClick={() => navigate('/')}>TrackIt</p>
            <img src='https://img.freepik.com/fotos-gratis/imagem-aproximada-da-cabeca-de-um-lindo-leao_181624-35855.jpg?w=2000' alt='userImg' />
        </FooterContainer>
    );
};

export default NavBar;