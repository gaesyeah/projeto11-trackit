import { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "../../App";
import { NavContainer } from "./style";

const Footer = () => {

    const navigate = useNavigate();

    console.log(useContext(InfoContext));

    return (
        <NavContainer>
            <p onClick={() => navigate('/habitos')}>Hábitos</p>
            <div onClick={() => navigate('/hoje')}>
                <CircularProgressbar
                    value={40}
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