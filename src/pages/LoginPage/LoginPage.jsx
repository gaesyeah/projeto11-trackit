import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../../components/Logo/Logo";
import { URL, customAlertSwal } from "../../constants";
import { SignBody } from "../../style/SignBody";

const LoginPage = ({setLoginData}) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [loginInputs, setLoginInputs] = useState({email: '', password: ''});

    const login = (e, googleData) => {
        //verifica se o registro foi feito ou não pela Google
        let loginInfos;
        if(!googleData){
            e.preventDefault();
            loginInfos = loginInputs;
        } else {
            loginInfos = googleData;
        }

        setLoading(true);

        axios.post(`${URL}/auth/login`, loginInfos)
        .then(({data}) => {
            setLoginData(data);
            navigate('/hoje');
        })
        .catch(({response}) => {
            const {details, message} = response.data;
            
            setLoading(false);
            //-------------
            if(googleData && message === "Usuário e/ou senha inválidos!"){
                let googleRedirect = true;
                navigate('/cadastro', {state: {googleRedirect}});
            } else {
                customAlertSwal.icon = 'error',
                customAlertSwal.title = `<span style="color: #f24d4d;font-size: 18px">${!details ? '' : details+'\n'}${message}</span>`;
                Swal.fire(customAlertSwal);
            }
        })
    }

    const googleCallBack = ({credential}) => {
        const decodedCredential = jwtDecode(credential);
        const {email, sub} = decodedCredential;
        const data = {email, password: sub};

        login(undefined, data);
    }
    const signGoogleDiv = useRef(null);
    useEffect(()=> {
        /* global google */
        google.accounts.id.initialize({
            client_id: '45868346241-lmib1jv8800e6mg6trsnrde05kok28en.apps.googleusercontent.com',
            callback: googleCallBack
        });
        google.accounts.id.renderButton(
            signGoogleDiv.current,
            {locale: 'PT-br', theme:'outline', size:'large', width: '303px'}
        );
    },[]);

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
                    data-test="email-input"
                ></input>
                <input
                    disabled={loading}
                    type="password"
                    placeholder="senha"
                    required
                    value={loginInputs.password}
                    onChange={(e) => setLoginInputs(previous => ({...previous, ['password']: e.target.value}))}
                    data-test="password-input"
                ></input>
                <button
                    disabled={loading} 
                    type="submit"
                    data-test="login-btn"
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
            <div ref={signGoogleDiv}/>
            <Link 
                to='/cadastro' 
                data-test="signup-link"
            >Não tem uma conta? Cadastre-se!
            </Link>
        </SignBody>
    );
};

export default LoginPage;