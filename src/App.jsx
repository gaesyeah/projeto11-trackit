import { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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

    const [loginData, setLoginData] = useState(null);
    const [hojeData, setHojeData] = useState(null);
    useEffect(() => {
        if (loginData !== null){
            /*requisição axios para definir a variavel hojeData*/ 
        }
    }, [loginData]);

    const todayProgress = () => {
        return Math.trunc((hojeData.filter((habit) => habit.done).length / hojeData.length) * 100)
    }

    return (
        <DataContext.Provider value={{todayProgress, hojeData, loginData, setLoginData}}>
            {pathname !== '/' && pathname !== '/cadastro'
                && <><Footer /> <NavBar /></>
            }
            <Routes>
                <Route path='/' element={<LoginPage />} />
                <Route path='/cadastro' element={<RegisterPage />} />
                <Route path='/habitos' element={<HabitsPage />} />
                <Route path='/hoje' element={<TodayPage />} />
                <Route path='/historico' element={<HistoryPage />} />
            </Routes>
        </DataContext.Provider>
    );
};

export default App;