import axios from "axios";
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

    const {config, clickedHabits, historicoData, setHistoricoData} = useContext(DataContext);

    const navigate = useNavigate();

    const [reRender, setReRender] = useState(false);
    useEffect(() => {
        axios.get(`${URL}/habits/history/daily`, config)
        .then(({data}) => {
            setHistoricoData(data);

            setReRender(true);
        })
        .catch(({response}) => {
            const {details, message} = response.data;
            console.log(`${!details ? '' : details}\n${message}`);

            navigate('/');
        });
    }, [reRender]);

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
                <CalendarComponent/>
                <MyHabits>
                    {clickedHabits.map((habit) => 
                        <HabitsComponent habit={habit} key={habit.name} />
                    )}
                <StyledP>
                    {/* menor ou igual a 1 porque o dia atual é desconsiderado */}
                    {historicoData.length <= 1 
                        ?
                        'Seu historico está atualmente vazio Crie hábitos e/ou aguarde um dia'
                        :
                        clickedHabits.length === 0 
                        &&
                        `Clique em um dos dias marcados em ${<span>vermelho</span>} ou ${<span>verde</span>} para ver os habitos concluidos do mesmo`
                    }
                </StyledP>
                </MyHabits>
            </PageBody>
        );
    };
};

export default HistoryPage;