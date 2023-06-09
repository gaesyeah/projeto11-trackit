import { useEffect, useRef, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import { StyledBackGround } from "./components/SideBar/BackGround/styled";
import SideBar from "./components/SideBar/SideBar";
import { BooleanContext } from "./contexts/BooleanContext";
import { DataContext } from "./contexts/DataContext";
import { UserContext } from "./contexts/UserContext";
import HabitsPage from "./pages/HabitsPage/HabitsPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TodayPage from "./pages/TodayPage/TodayPage";

const App = () => {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({});
    const {token, image, name} = loginData;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    //criei como null para utilizar os loadings de maneira correta, para caso as requisições retornem um array vazio
    //criei no App para a página não ficar recarregando sempre que o usuario trocar a rota
    const [hojeData, setHojeData] = useState(null);
    const [habitosData, setHabitosData] = useState(null);
    const [historicoData, setHistoricoData] = useState(null);
    useEffect(() => {
        //navega direto para a rota /hoje caso tenha uma config previa no localStorage
        if (localStorage.getItem('config')){
            navigate('/hoje');
        };
        /*redefine novamente as keys no localStorage caso o loginData já tenha sido "setado" na rota /login
        para não permitir que os valores no localStorage sejam redefinidos para undefined*/
        if (Object.keys(loginData).length > 0) {
            localStorage.setItem('config', JSON.stringify(config));
            localStorage.setItem('image', image);
            localStorage.setItem('name', name);
        };
    }, [loginData]);

    const storedConfig = useRef(JSON.parse(localStorage.getItem('config')));
    const storedImage = useRef(localStorage.getItem('image'));
    const storedName = useRef(localStorage.getItem('name'));
    //variavel que controla a sideBar
    const [showSideBar, setShowSideBar] = useState(false);
    return (
        <DataContext.Provider 
            value={{setLoginData, hojeData, setHojeData, setHabitosData, historicoData, setHistoricoData
        }}>
            <UserContext.Provider 
                value={{                
                    config: !storedConfig.current ? config : storedConfig.current,
                    image: !storedImage.current ? image : storedImage.current,
                    name: !storedName.current ? name : storedName.current,
            }}>
                <BooleanContext.Provider 
                    value={{
                        notLogged: !(Object.keys(loginData).length === 0 && !localStorage.getItem('config') && hojeData === null),
                        showSideBar, setShowSideBar
                }}>

                    <Footer/>
                    <NavBar/>
                    {!(Object.keys(loginData).length === 0 && !localStorage.getItem('config') && hojeData === null)
                        &&
                        <>
                            <SideBar/>
                            {showSideBar && <StyledBackGround onClick={() => {setShowSideBar(false)}}/>}
                        </>
                    }
                    
                    <Routes>
                        <Route path='/' element={<LoginPage/>} />
                        <Route path='/cadastro' element={<RegisterPage />} />
                        <Route path='/habitos' element={<HabitsPage habitosData={habitosData} />} />
                        <Route path='/hoje' element={<TodayPage />} />
                        <Route path='/historico' element={<HistoryPage />} />
                    </Routes>
                </BooleanContext.Provider>
            </UserContext.Provider>    
        </DataContext.Provider>
    );
};

export default App;