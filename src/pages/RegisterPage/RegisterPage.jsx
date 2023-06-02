import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import { URL } from "../../constants";
import { SignBody } from "../../style/SignBody";

const RegisterPage = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [registerInputs, setRegisterInputs] = useState({
        email: '', name: '', image: '', password: ''
    });

    const register = (e) => {
        e.preventDefault();

        setLoading(true);
        
        axios.post(`${URL}/auth/sign-up`, registerInputs)
        .then(() => navigate('/'))
        .catch(({response}) => {
            const {details, message} = response.data;
            alert(`${!details ? '' : details}\n${message}`);
            
            setLoading(false);
        });
    }

    return (
        <SignBody>
            <Logo />
            <form onSubmit={register}>
                <input
                    disabled={loading}
                    type="email" 
                    placeholder="email" 
                    required
                    value={registerInputs.email}
                    onChange={(e) => setRegisterInputs(previous => ({...previous, ['email']: e.target.value}))}
                    data-test="email-input"
                >
                </input>
                <input
                    disabled={loading}
                    type="password" 
                    placeholder="senha" 
                    required
                    value={registerInputs.password}
                    onChange={(e) => setRegisterInputs(previous => ({...previous, ['password']: e.target.value}))}
                    data-test="password-input"
                >
                </input>
                <input
                    disabled={loading}
                    type="text" 
                    placeholder="nome" 
                    required
                    value={registerInputs.name}
                    onChange={(e) => setRegisterInputs(previous => ({...previous, ['name']: e.target.value}))}
                    data-test="user-name-input"
                >
                </input>
                <input
                    disabled={loading}
                    type="text" 
                    placeholder="foto(link)" 
                    required
                    value={registerInputs.image}
                    onChange={(e) => setRegisterInputs(previous => ({...previous, ['image']: e.target.value}))}
                    data-test="user-image-input"
                >
                </input>
                <button
                    disabled={loading} 
                    type="submit"
                    data-test="signup-btn" 
                >{!loading && 'Cadastrar'}
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
            <Link 
                to='/'
                data-test="login-link"
            >Já tem uma conta? Faça login!
            </Link>
        </SignBody>
    );
};

export default RegisterPage;