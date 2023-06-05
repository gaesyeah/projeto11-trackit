import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../../components/Logo/Logo";
import { URL, customAlertSwal } from "../../constants";
import { SignBody } from "../../style/SignBody";

const RegisterPage = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [registerInputs, setRegisterInputs] = useState({
        email: '', name: '', image: '', password: ''
    });

    const register = (e, googleData) => {
        //verifica se o registro foi feito ou não pela Google
        let registerInfos;
        if(!googleData){
            e.preventDefault();
            registerInfos = registerInputs;
        } else {
            registerInfos = googleData;
        }

        setLoading(true);
        
        axios.post(`${URL}/auth/sign-up`, registerInfos)
        .then(() => {
            customAlertSwal.icon = 'success';
            customAlertSwal.title = `<span style="color: #5cba5c;font-size: 18px">Conta criada com sucesso!</span>`;
            Swal.fire(customAlertSwal);
            navigate('/');
        })
        .catch(({response}) => {
            const {details, message} = response.data;

            customAlertSwal.icon = 'error';
            customAlertSwal.title = `<span style="color: #f24d4d;font-size: 18px">${!details ? '' : details+'\n'}${message}</span>`;
            Swal.fire(customAlertSwal);
            
            setLoading(false);
        });
    }

    const googleCallBack = ({credential}) => {
        const decodedCredential = jwtDecode(credential);
        const {name, picture, email, sub} = decodedCredential;
        const data = {email, name, image: picture, password: sub};

        register(undefined, data);
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
            { locale: 'PT-br', text: 'continue_with', theme: 'filled_blue', size:'large', width: '303px'}
        );        
    },[]);

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
            <div ref={signGoogleDiv}/>
            <Link 
                to='/'
                data-test="login-link"
            >Já tem uma conta? Faça login!
            </Link>
        </SignBody>
    );
};

export default RegisterPage;