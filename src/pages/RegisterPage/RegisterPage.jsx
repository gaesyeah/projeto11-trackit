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
                <input type="email" placeholder="email" required></input>
                <input type="password" placeholder="senha" required></input>
                <input type="text" placeholder="nome" required></input>
                <input type="text" placeholder="foto" required></input>
                <button type="submit">Cadastrar</button>
            </form>
            <p onClick={() => navigate('/')}>Já tem uma conta? Faça login!</p>
        </SignBody>
    );
};

export default RegisterPage;