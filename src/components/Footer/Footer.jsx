import { useContext } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import { FooterContainer } from "./style";

const Footer = () => {

    const navigate = useNavigate();

    const {todayProgress} = useContext(DataContext);

    return (
        <FooterContainer>
            <Link to='/habitos'>Hábitos</Link>
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
            <Link to='/historico'>Histórico</Link>
        </FooterContainer>
    );
};

export default Footer;