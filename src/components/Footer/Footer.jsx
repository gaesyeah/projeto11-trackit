import { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { BooleanContext } from "../../contexts/BooleanContext";
import { DataContext } from "../../contexts/DataContext";
import { FooterContainer } from "./style";

const Footer = () => {

    const navigate = useNavigate();

    const {hojeData} = useContext(DataContext);
    const {showSideBar, notLogged} = useContext(BooleanContext);

    let todayProgress;
    if (hojeData === null || hojeData.length === 0){
        todayProgress = 0;
    } else {
        todayProgress = Math.trunc((hojeData.filter(({done}) => done).length / hojeData.length) * 100);
    } 

    return (
        <FooterContainer not={notLogged} showSideBar={showSideBar} data-test="menu">
            <Link data-test="habit-link"
                to='/habitos'
            >Hábitos
            </Link>
            <div data-test="today-link"
                onClick={() => navigate('/hoje')}
            >
                <CircularProgressbar text='Hoje' background backgroundPadding={6} 
                    styles={buildStyles({backgroundColor: "#52B6FF", textColor: "#FFFFFF", pathColor: "#FFFFFF", trailColor: "transparent"})}
                    value={todayProgress}
                />
            </div>
            <Link data-test="history-link"
                to='/historico'
            >Histórico
            </Link>
        </FooterContainer>
    );
};

export default Footer;