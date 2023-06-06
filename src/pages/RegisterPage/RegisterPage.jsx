import axios from "axios";
import jwtDecode from "jwt-decode";
import { useContext, useEffect, useRef, useState } from "react";
import FileResizer from "react-image-file-resizer";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../../components/Logo/Logo";
import { URL, customAlertSwal, customCreatedAccSwal } from "../../constants";
import { DataContext } from "../../contexts/DataContext";
import { SignBody, StyledInputFile } from "../../style/SignBody";

const RegisterPage = () => {

    const {setLoginData} = useContext(DataContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [registerInputs, setRegisterInputs] = useState({
        email: '', name: '', image: '', password: ''
    });

    const register = (e, email, name, picture, sub) => {
        
        setLoading(true);
        
        let registerInfos;
        //verifica se o registro foi feito pelo Submit ou Google
        if(e){
            e.preventDefault();
            registerInfos = registerInputs;
        } else {
            registerInfos = {email, name, image: picture, password: sub};
        }
        axios.post(`${URL}/auth/sign-up`, registerInfos)
        .then(() => {
            Swal.fire(customCreatedAccSwal);
            navigate('/');
        })
        .catch(({response}) => {
            const {details, message} = response.data;
            
            customAlertSwal.icon = 'error';
            customAlertSwal.title = `<span style="color: #f24d4d;font-size: 18px">${!details ? '' : details+'\n'}${message}</span>`;
            /*Caso o cadastro tenha sido feito com o Google e a mensagem de erro
            for "Usuário já cadastrado!" será feita uma tentativa de login*/
            if (e === undefined && message === "Usuário já cadastrado!"){
                
                axios.post(`${URL}/auth/login`, {email, password: sub})
                .then(({data}) => {
                    setLoginData(data);
                    navigate('/hoje');
                })
                .catch(() => {
                    /*utilizo a response do primeiro catch de cadastro pq desse ter sido
                    referente ao login, a requisição foi feita na tela de cadastro*/
                    Swal.fire(customAlertSwal);
                    setLoading(false);
                })
            //Se não, será mostrada uma mensagem de erro no cadastro
            } else {
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

    const [imageName, setImageName] = useState(false);
    const base64Converter = (e) => {
        const file = e.target.files[0];

        FileResizer.imageFileResizer(file, 85, 85,'JPG', 90, 0,
            (compressedImage) => {
                setRegisterInputs(previous => ({...previous, ['image']: compressedImage}));
                setImageName(file.name);
            },'base64'
        );
    }

    return (
        <SignBody>
            <Logo />
            <form onSubmit={register}>
                <input type="email" placeholder="email" required data-test="email-input"
                    value={registerInputs.email}
                    onChange={(e) => setRegisterInputs(previous => ({...previous, ['email']: e.target.value}))}
                    disabled={loading}
                >
                </input>
                <input type="password"  placeholder="senha" data-test="password-input"
                    required value={registerInputs.password}
                    onChange={(e) => setRegisterInputs(previous => ({...previous, ['password']: e.target.value}))}
                    disabled={loading}
                >
                </input>
                <input type="text" placeholder="nome" required data-test="user-name-input"
                    value={registerInputs.name}
                    onChange={(e) => setRegisterInputs(previous => ({...previous, ['name']: e.target.value}))}
                    disabled={loading}
                >
                </input>
                <StyledInputFile seted={imageName}>
                    <label htmlFor="inputFile">
                        <p>{registerInputs.image === '' ? 'Imagem' : imageName}</p>
                    </label>
                    <input id="inputFile" type="file" required data-test="user-image-input"
                        onChange={(e) => base64Converter(e)}
                        disabled={loading}
                    >
                    </input>
                </StyledInputFile>
                <button type="submit" data-test="signup-btn" 
                    disabled={loading} 
                >{!loading && 'Cadastrar'}
                    <ThreeDots height="60" width="60" radius="9" color="#FFFFFF" ariaLabel="three-dots-loading"
                        visible={loading}
                    />
                </button>
            </form>
            <div ref={signGoogleDiv}/>
            <Link to='/' data-test="login-link"
            >Já tem uma conta? Faça login!
            </Link>
        </SignBody>
    );
};

export default RegisterPage;