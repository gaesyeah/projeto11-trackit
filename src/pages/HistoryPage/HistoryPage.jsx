import axios from "axios";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import { Blocks } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import CalendarComponent from "../../components/HistoryComponents/CalendarComponent/CalendarComponent";
import HabitsComponent from "../../components/HistoryComponents/HabitsComponent/HabitsComponent";
import { URL, customReloginSwal } from "../../constants";
import { BooleanContext } from "../../contexts/BooleanContext";
import { DataContext } from "../../contexts/DataContext";
import { UserContext } from "../../contexts/UserContext";
import { H2Formater, NullLoading, PageBody } from "../../style/PageBody";
import { MyHabits } from "../HabitsPage/styled";
import { StyledP } from "./styled";

const HistoryPage = () => {

    const {historicoData, setHistoricoData} = useContext(DataContext);
    const {config} = useContext(UserContext);
    const {showSideBar} = useContext(BooleanContext);

    const navigate = useNavigate();

    const [clickedHabits, setClickedHabits] = useState([]);

    useEffect(() => {
        axios.get(`${URL}/habits/history/daily`, config)
        .then(({data}) => setHistoricoData(data))
        .catch(({response}) => {
            const {details, message} = response.data;
            console.log(`${!details ? '' : details}\n${message}`);

            Swal.fire(customReloginSwal);

            navigate('/');
        });
    }, []);

    if (historicoData === null) {
        return (
            <NullLoading>
                <Blocks visible={historicoData === null} height="100" width="100"/>
            </NullLoading>
        );
    } else {
        return (
            <PageBody showSideBar={showSideBar}>
                <H2Formater>
                    <h2>Histórico</h2>
                </H2Formater>
                <div data-test="calendar">
                    <CalendarComponent setClickedHabits={setClickedHabits}/>
                </div>
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
                        <>Clique em um dos dias marcados em <span>verde</span>, <span>laranja</span> ou <span>vermelho</span> para ver os habitos concluidos do mesmo</>
                    }
                </StyledP>
                </MyHabits>
            </PageBody>
        );
    };
};

export default HistoryPage;