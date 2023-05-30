import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { SignBody } from "../../style/SignBody";

const RegisterPage = () => {

    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();

        navigate('/');
    }

    return (
        <SignBody>
            <Logo />
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