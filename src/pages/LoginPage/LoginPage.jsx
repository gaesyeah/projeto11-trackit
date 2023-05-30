import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { SignBody } from "../../style/SignBody";

const LoginPage = () => {

    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault();

        navigate('/hoje');
    }

    return (
        <SignBody>
            <Logo />
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