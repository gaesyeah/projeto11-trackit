import { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import HabitsPage from "./pages/HabitsPage/HabitsPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TodayPage from "./pages/TodayPage/TodayPage";
export const DataContext = createContext();

const App = () => {

    const { pathname } = useLocation();

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({});
    const {token, image} = loginData;
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
        };
    }, [loginData]);

    const todayProgress = () => {
        if (hojeData !== null){
            return Math.trunc((hojeData.filter(({done}) => done).length / hojeData.length) * 100);
        } else {
            return;
        }
    }

    const storedConfig = localStorage.getItem('config');
    const storedImage = localStorage.getItem('image');
    return (
        <DataContext.Provider value={{todayProgress, config: storedConfig ? JSON.parse(storedConfig) : config}}>
            {pathname !== '/' && pathname !== '/cadastro' 
                && <><Footer/><NavBar image={storedImage ? storedImage : image}/></>
            }
            <Routes>
                <Route path='/' element={<LoginPage setLoginData={setLoginData}/>} />
                <Route path='/cadastro' element={<RegisterPage />} />
                <Route path='/habitos' element={<HabitsPage habitosData={habitosData} setHabitosData={setHabitosData} setHojeData={setHojeData}/>} />
                <Route path='/hoje' element={<TodayPage hojeData={hojeData} setHojeData={setHojeData}/>} />
                <Route path='/historico' element={<HistoryPage historicoData={historicoData} setHistoricoData={setHistoricoData} />} />
            </Routes>
        </DataContext.Provider>
    );
};

export default App;