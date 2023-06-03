import { createContext, useEffect, useRef, useState } from "react";
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

    const storedConfig = useRef(localStorage.getItem('config'));
    const storedImage = useRef(localStorage.getItem('image'));
    const storedName = useRef(localStorage.getItem('name'));
    return (
        <DataContext.Provider 
            value={{
                config: !storedConfig.current ? config : JSON.parse(storedConfig.current),
                hojeData, setHojeData,
                setHabitosData,
                historicoData, setHistoricoData
            }}
        >

            {pathname !== '/' && pathname !== '/cadastro' 
                && 
                <>
                    <Footer/>
                    <NavBar
                        image={!storedImage.current ? image : storedImage.current}
                        name={!storedName.current ? name : storedName.current}
                    />
                </>
            }
            
            <Routes>
                <Route path='/' element={<LoginPage setLoginData={setLoginData}/>} />
                <Route path='/cadastro' element={<RegisterPage />} />
                <Route path='/habitos' element={<HabitsPage habitosData={habitosData} />} />
                <Route path='/hoje' element={<TodayPage />} />
                <Route path='/historico' element={<HistoryPage />} />
            </Routes>
            
        </DataContext.Provider>
    );
};

export default App;