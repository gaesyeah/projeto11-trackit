import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import CalendarComponent from "../../components/HistoryComponents/CalendarComponent/CalendarComponent";
import HabitsComponent from "../../components/HistoryComponents/HabitsComponent/HabitsComponent";
import { URL } from "../../constants";
import { H2Formater, NullLoading, PageBody } from "../../style/PageBody";
import { MyHabits } from "../HabitsPage/styled";
import loadingGif from "./../../assets/loadingGif.gif";
import { StyledP } from "./styled";

const HistoryPage = () => {

    const {config, historicoData, setHistoricoData} = useContext(DataContext);

    const navigate = useNavigate();

    const [clickedHabits, setClickedHabits] = useState([]);

    useEffect(() => {
        axios.get(`${URL}/habits/history/daily`, config)
        .then(({data}) => setHistoricoData(data))
        .catch(({response}) => {
            const {details, message} = response.data;
            console.log(`${!details ? '' : details}\n${message}`);

            navigate('/');
        });
    }, []);

    if (historicoData === null) {
        return (
            <NullLoading>
                <img src={loadingGif} alt='reloading'/>
            </NullLoading>
        );
    } else {
        return (
            <PageBody>
                <H2Formater>
                    <h2>Histórico</h2>
                </H2Formater>
                <CalendarComponent setClickedHabits={setClickedHabits}/>
                <MyHabits small={true}>
                    {clickedHabits.map((habit, i) => 
                        <HabitsComponent habit={habit} key={i} />
                    )}
                <StyledP>
                    {/*OBS: se o tamanho da array for 1, e o dia atual estiver contido(meu calendario ignora o dia atual, por isso essa verificação) */}
                    {(historicoData.length === 1 && historicoData.some(({day}) => day === dayjs().format("DD/MM/YYYY"))) || historicoData.length === 0
                        ?
                        <>Seu historico está atualmente vazio Crie hábitos e/ou aguarde um dia</>
                        :
                        clickedHabits.length === 0 
                        &&
                        <>Clique em um dos dias marcados em <span>vermelho</span> ou <span>verde</span> para ver os habitos concluidos do mesmo</>
                    }
                </StyledP>
                </MyHabits>
            </PageBody>
        );
    };
};

export default HistoryPage;