import { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import { NavContainer } from "./style";

const Footer = () => {

    const navigate = useNavigate();

    const {todayProgress} = useContext(DataContext);

    return (
        <NavContainer>
            <p onClick={() => navigate('/habitos')}>Hábitos</p>
            <div onClick={() => navigate('/hoje')}>
                <CircularProgressbar
                    value={isNaN(todayProgress()) ? 0 : todayProgress()}
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
            <p onClick={() => navigate('/historico')}>Histórico</p>
        </NavContainer>
    );
};

export default Footer;