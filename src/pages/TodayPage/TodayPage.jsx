import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { useContext, useEffect } from "react";
import { Blocks } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TodayHabit from "../../components/TodayHabit/TodayHabit";
import { URL, customReloginSwal } from "../../constants";
import { BooleanContext } from "../../contexts/BooleanContext";
import { DataContext } from "../../contexts/DataContext";
import { UserContext } from "../../contexts/UserContext";
import { H2Formater, NullLoading, PageBody } from "../../style/PageBody";
import { Progress, TodayHabitsBox } from "./styled";

const TodayPage = () => {

    const {hojeData, setHojeData} = useContext(DataContext);
    const {config} = useContext(UserContext);
    const {showSideBar} = useContext(BooleanContext);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${URL}/habits/today`, config)
        .then(({data}) => setHojeData(data))
        .catch(({response}) => {
            const {details, message} = response.data;
            console.log(`${!details ? '' : details}\n${message}`);

            Swal.fire(customReloginSwal);

            navigate('/');
        });
    }, []);

    if (hojeData === null){
        return (
            <NullLoading>
                <Blocks visible={hojeData === null} height="100" width="100"/>
            </NullLoading>
        );
    } else {
        
        const date = dayjs().locale('pt-br').format('dddd, DD/MM').replace('-feira', '');
        
        const todayProgress = Math.trunc((hojeData.filter(({done}) => done).length / hojeData.length) * 100);

        return (
            <PageBody showSideBar={showSideBar}>
                <Progress>
                    <H2Formater>
                        <h2 data-test="today">{date}</h2>
                        {hojeData.length === 0 
                            ?
                            <p>Não há nenhum hábito para hoje</p>
                            :
                            <h1 data-test="today-counter">
                                {todayProgress > 0
                                    ?
                                    <span>{todayProgress}% dos hábitos concluídos</span>
                                    :
                                    'Nenhum hábito concluído ainda'
                                }
                            </h1>
                        }
                    </H2Formater>
                </Progress>
                <TodayHabitsBox>
                    {hojeData.map((habit) => 
                        <TodayHabit
                            key={habit.id} 
                            habit={habit}
                        />
                    )}
                </TodayHabitsBox>
            </PageBody>
        );
    };
};

export default TodayPage;
