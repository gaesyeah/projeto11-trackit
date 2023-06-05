import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { useContext, useEffect } from "react";
import { Blocks } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import TodayHabit from "../../components/TodayHabit/TodayHabit";
import { URL } from "../../constants";
import { H2Formater, NullLoading, PageBody } from "../../style/PageBody";
import { Progress, TodayHabitsBox } from "./styled";

const TodayPage = () => {

    const {config, hojeData, setHojeData, showSideBar} = useContext(DataContext);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${URL}/habits/today`, config)
        .then(({data}) => setHojeData(data))
        .catch(({response}) => {
            const {details, message} = response.data;
            console.log(`${!details ? '' : details}\n${message}`);

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
        
        const date = dayjs().locale('pt-br').format('dddd, DD/MM');
        
        const todayProgress = Math.trunc((hojeData.filter(({done}) => done).length / hojeData.length) * 100);

        return (
            <PageBody showSideBar={showSideBar}>
                <Progress>
                    <H2Formater>
                        <h2 data-test="today">{date.charAt(0).toUpperCase() + date.slice(1)}</h2>
                        {hojeData.length === 0 
                            ?
                            <p data-test="today-counter">Não há nenhum hábito para hoje</p>
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
