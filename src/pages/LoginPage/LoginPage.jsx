import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { URL } from "../../constants";
import { SignBody } from "../../style/SignBody";

const LoginPage = ({setLoginData}) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [loginInputs, setLoginInputs] = useState({email: '', password: ''});

    const login = (e) => {
        e.preventDefault();

        setLoading(true);

        axios.post(`${URL}/auth/login`, loginInputs)
        .then(({data}) => {
            setLoginData(data);
            navigate('/hoje');
        })
        .catch(({response}) => {
            const {details, message} = response.data;
            alert(`${!details ? '' : details}\n${message}`);

            setLoading(false);
        })
    }

    return (
        <SignBody>
            <Logo />
            <form onSubmit={login}>
                <input
                    disabled={loading}
                    type="email" 
                    placeholder="email" 
                    required
                    value={loginInputs.email}
                    onChange={(e) => setLoginInputs(previous => ({...previous, ['email']: e.target.value}))}
                ></input>
                <input
                    disabled={loading}
                    type="password"
                    placeholder="senha"
                    required
                    value={loginInputs.password}
                    onChange={(e) => setLoginInputs(previous => ({...previous, ['password']: e.target.value}))}
                ></input>
                <button
                    disabled={loading} 
                    type="submit"
                >{!loading && 'Entrar'}
                <ThreeDots 
                    height="60" 
                    width="60" 
                    radius="9"
                    color="#FFFFFF" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={loading}
                /></button>
            </form>
            <Link to='/cadastro'>Não tem uma conta? Cadastre-se!</Link>
        </SignBody>
    );
};

export default LoginPage;