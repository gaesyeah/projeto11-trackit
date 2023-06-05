import { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import { FooterContainer } from "./style";

const Footer = () => {

    const navigate = useNavigate();

    const {showSideBar, hojeData, notLogged} = useContext(DataContext);

    let todayProgress;
    if (hojeData === null || hojeData.length === 0){
        todayProgress = 0;
    } else {
        todayProgress = Math.trunc((hojeData.filter(({done}) => done).length / hojeData.length) * 100);
    } 

    return (
        <FooterContainer not={notLogged} showSideBar={showSideBar} data-test="menu">
            <Link 
                to='/habitos'
                data-test="habit-link"
            >Hábitos
            </Link>
            <div 
                onClick={() => navigate('/hoje')}
                data-test="today-link"
            >
                <CircularProgressbar
                    value={todayProgress}
                    text='Hoje'
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                        backgroundColor: "#52B6FF",
                        textColor: "#FFFFFF",
                        pathColor: "#FFFFFF",
                        trailColor: "transparent"
                    })}
                />
            </div>
            <Link 
                to='/historico'
                data-test="history-link"
            >Histórico
            </Link>
        </FooterContainer>
    );
};

export default Footer;