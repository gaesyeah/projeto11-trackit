import { useNavigate } from "react-router-dom";
import { SignBody } from "../../style/SignBody";
import logo from "./../../assets/logo.png";

const LoginPage = () => {

    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();

        navigate('/hoje');
    }

    return (
        <SignBody>
            <div>
                <img src={logo} alt="logo"/>
                <h1>TrackIt</h1>
            </div>
            <form onSubmit={login}>
                <input type="email" placeholder="email"></input>
                <input type="password" placeholder="senha"></input>
                <button type="submit">Entrar</button>
            </form>
            <p onClick={() => navigate('/cadastro')}>Não tem uma conta? Cadastre-se!</p>
        </SignBody>
    );
};

export default LoginPage;