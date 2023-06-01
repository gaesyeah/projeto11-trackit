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

const HistoryPage = ({historicoData, setHistoricoData}) => {

    const {config} = useContext(DataContext);

    const navigate = useNavigate();

    //variavel de estado para renderizar os habitos no onClickDay (o calendario esta no componente CalendarComponent)
    const [clickedHabits, setClickedHabits] = useState([]);

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
                <CalendarComponent historicoData={historicoData} setClickedHabits={setClickedHabits}/>
                <MyHabits>
                    {clickedHabits.map((habit) => 
                        <HabitsComponent habit={habit} key={habit.name} />
                    )}
                </MyHabits>
            </PageBody>
        );
    };
};

export default HistoryPage;