import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import { URL } from "./constants";
import HabitsPage from "./pages/HabitsPage/HabitsPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TodayPage from "./pages/TodayPage/TodayPage";
export const DataContext = createContext();

const App = () => {

    const { pathname } = useLocation();

    const [loginData, setLoginData] = useState({});
    const {token, image} = loginData;
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const [hojeData, setHojeData] = useState([]);
    const [habitosData, setHabitosData] = useState([]);
    useEffect(() => {
        //vai vai entrar nesse if somente quando o loginData for definido, lá na rota /
        if (Object.keys(loginData).length > 0){
            
            axios.get(`${URL}/habits/today`, config)
            .then(({data}) => setHojeData(data))
            .catch(({response}) => {
                const {details, message} = response.data;
                alert(`${!details ? '' : details}\n${message}`);
            });

            axios.get(`${URL}/habits`, config)
            .then(({data}) => setHabitosData(data))
            .catch(({response}) => {
                const {details, message} = response.data;
                console.log(`${!details ? '' : details}\n${message}`);
            });
            
        }
    }, [loginData]);

    const todayProgress = () => {
        return Math.trunc((hojeData.filter(({done}) => done).length / hojeData.length) * 100);
    }

    return (
        <DataContext.Provider value={{todayProgress, config}}>
            {pathname !== '/' && pathname !== '/cadastro' 
                && <><Footer/><NavBar image={image}/></>
            }
            <Routes>
                <Route path='/' element={<LoginPage setLoginData={setLoginData}/>} />
                <Route path='/cadastro' element={<RegisterPage />} />
                <Route path='/habitos' element={<HabitsPage habitosData={habitosData} setHabitosData={setHabitosData}/>} />
                <Route path='/hoje' element={<TodayPage hojeData={hojeData}/>} />
                <Route path='/historico' element={<HistoryPage />} />
            </Routes>
        </DataContext.Provider>
    );
};

export default App;