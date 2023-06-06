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

const LoginPage = () => {

    const {setLoginData} = useContext(DataContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [loginInputs, setLoginInputs] = useState({email: '', password: ''});

    const login = (e, name, picture, email, sub) => {
        
        let loginInfos = undefined;
        //verifica se o registro foi feito pelo Submit ou Google
        if(e !== undefined){
            e.preventDefault();
            loginInfos = loginInputs;
        } else {
            loginInfos = {email, password: sub};
        }

        setLoading(true);

        axios.post(`${URL}/auth/login`, loginInfos)
        .then(({data}) => {
            setLoginData(data);
            navigate('/hoje');
        })
        .catch(({response}) => {
            const {details, message} = response.data;

            customAlertSwal.icon = 'error';
            customAlertSwal.title = `<span style="color: #f24d4d;font-size: 18px">${!details ? '' : details+'\n'}${message}</span>`;
            
            //Caso o login tenha sido feito com o Google e a mensagem de erro
            //for "Usuário e/ou senha inválidos!" será feita uma tentativa de cadastro
            if(e === undefined && message === "Usuário e/ou senha inválidos!"){
                
                axios.post(`${URL}/auth/sign-up`, {email, name, image: picture, password: sub})
                .then(() => {
                    //E em caso de sucesso, será feita uma requisição de login
                    axios.post(`${URL}/auth/login`, loginInfos)
                    .then(({data}) => {
                        Swal.fire(customCreatedAccSwal);
                        setLoginData(data);
                        navigate('/hoje');
                    })
                    .catch(() => {
                        /*não preciso de parametros novos, é só reaproveitar os do primeiro catch
                        , é o mesmo usuario, são os mesmos dados, e a mesma requisição*/
                        Swal.fire(customAlertSwal);
                        setLoading(false);
                    })
                })
                .catch(() => {
                    /*utilizo a response do primeiro catch de login pq desse ter sido
                    referente ao cadastro, a requisição foi feita na tela de login*/
                    Swal.fire(customAlertSwal);
                    setLoading(false);
                });
            //Se não, será mostrada uma mensagem de erro no login
            } else {
                Swal.fire(customAlertSwal);

                setLoading(false);
            }
        })
    }

    const googleCallBack = ({credential}) => {
        const decodedCredential = jwtDecode(credential);
        const {name, picture, email, sub} = decodedCredential;

        login(undefined, name, picture, email, sub);
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