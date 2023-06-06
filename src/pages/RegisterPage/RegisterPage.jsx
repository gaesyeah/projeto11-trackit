import axios from "axios";
import jwtDecode from "jwt-decode";
import { useContext, useEffect, useRef, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../../components/Logo/Logo";
import { URL, customAlertSwal, customCreatedAccSwal } from "../../constants";
import { DataContext } from "../../contexts/DataContext";
import { SignBody } from "../../style/SignBody";

const RegisterPage = () => {

    const {setLoginData} = useContext(DataContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [registerInputs, setRegisterInputs] = useState({
        email: '', name: '', image: '', password: ''
    });

    const register = (e, email, name, picture, sub) => {
        
        let registerInfos;
        //verifica se o registro foi feito pelo Submit ou Google
        if(e){
            e.preventDefault();
            registerInfos = registerInputs;
        } else {
            registerInfos = {email, name, image: picture, password: sub};
        }

        setLoading(true);
        
        axios.post(`${URL}/auth/sign-up`, registerInfos)
        .then(() => {
            Swal.fire(customCreatedAccSwal);
            navigate('/');
        })
        .catch(({response}) => {
            const {details, message} = response.data;

            setLoading(false);
            //Caso o cadastro tenha sido feito com o Google e a mensagem de erro
            //for "Usuário já cadastrado!" será feita uma tentativa de login
            if (e === undefined && message === "Usuário já cadastrado!"){
                setLoading(true);
                
                axios.post(`${URL}/auth/login`, {email, password: sub})
                .then(({data}) => {
                    setLoginData(data);
                    navigate('/hoje');
                })
                .catch(({response}) => {
                    const {details, message} = response.data;
                    
                    customAlertSwal.icon = 'error',
                    customAlertSwal.title = `<span style="color: #f24d4d;font-size: 18px">${!details ? '' : details+'\n'}${message}</span>`;
                    Swal.fire(customAlertSwal);

                    setLoading(false);
                })
            //Se não, será mostrada uma mensagem de erro no cadastro
            } else {
                customAlertSwal.icon = 'error';
                customAlertSwal.title = `<span style="color: #f24d4d;font-size: 18px">${!details ? '' : details+'\n'}${message}</span>`;
                Swal.fire(customAlertSwal);
                
                setLoading(false);
            }
        });
    }

    const googleCallBack = ({credential}) => {
        const decodedCredential = jwtDecode(credential);
        const {name, picture, email, sub} = decodedCredential;

        register(undefined, email, name, picture, sub);
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
            { locale: 'PT-br', text: 'signup_with', theme:'outline', size:'large', width: '303px'}
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