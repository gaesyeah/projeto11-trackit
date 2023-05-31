import { createContext, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import NavBar from "./components/NavBar/NavBar";
import HabitsPage from "./pages/HabitsPage/HabitsPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import TodayPage from "./pages/TodayPage/TodayPage";

export const InfoContext = createContext();

const App = () => {

    const { pathname } = useLocation();

    const [bearerToken, setBearerToken] = useState(null);

    return (
        <InfoContext.Provider value={[bearerToken, setBearerToken]}>
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
        </InfoContext.Provider>
    );
};

export default App;