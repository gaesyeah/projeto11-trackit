import { useNavigate } from "react-router-dom";
import { SignBody } from "../../style/SignBody";
import logo from "./../../assets/logo.png";

const RegisterPage = () => {

    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();

        navigate('/');
    }

    return (
        <SignBody>
            <div>
                <img src={logo} alt="logo"/>
                <h1>TrackIt</h1>
            </div>
            <form onSubmit={register}>
                <input type="email" placeholder="email"></input>
                <input type="password" placeholder="senha"></input>
                <input type="text" placeholder="nome"></input>
                <input type="text" placeholder="foto"></input>
                <button type="submit">Cadastrar</button>
            </form>
            <p onClick={() => navigate('/')}>Já tem uma conta? Faça login!</p>
        </SignBody>
    );
};

export default RegisterPage;