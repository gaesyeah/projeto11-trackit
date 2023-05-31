import axios from "axios";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
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
            alert(`${!details ? '' : details}\n${message}`)
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
                    >
                    </input>
                    <input
                        disabled={loading}
                        type="password" 
                        placeholder="senha" 
                        required
                        value={registerInputs.password}
                        onChange={(e) => setRegisterInputs(previous => ({...previous, ['password']: e.target.value}))}
                    >
                    </input>
                    <input
                        disabled={loading}
                        type="text" 
                        placeholder="nome" 
                        required
                        value={registerInputs.name}
                        onChange={(e) => setRegisterInputs(previous => ({...previous, ['name']: e.target.value}))}
                    >
                    </input>
                    <input
                        disabled={loading}
                        type="text" 
                        placeholder="foto" 
                        required
                        value={registerInputs.image}
                        onChange={(e) => setRegisterInputs(previous => ({...previous, ['image']: e.target.value}))}
                    >
                    </input>
                    <button
                        disabled={loading} 
                        type="submit" 
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
                <p onClick={() => navigate('/')}>Já tem uma conta? Faça login!</p>
        </SignBody>
    );
};

export default RegisterPage;