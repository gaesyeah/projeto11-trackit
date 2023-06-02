import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import TodayHabit from "../../components/TodayHabit/TodayHabit";
import { URL } from "../../constants";
import { H2Formater, NullLoading, PageBody } from "../../style/PageBody";
import loadingGif from "./../../assets/loadingGif.gif";
import { Progress, TodayHabitsBox } from "./styled";

const TodayPage = ({hojeData}) => {

    const {config, todayProgress, setHojeData} = useContext(DataContext);

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
                <img src={loadingGif} alt='reloading'/>
            </NullLoading>
        );
    } else {
        
        const date = dayjs().locale('pt-br').format('dddd, DD/MM');

        return (
            <PageBody>
                <Progress>
                    <H2Formater>
                        <h2 data-test="today">{date.charAt(0).toUpperCase() + date.slice(1)}</h2>
                        {hojeData.length === 0 
                            ?
                            <p data-test="today-counter">Não há nenhum hábito para hoje</p>
                            :
                            <h1 data-test="today-counter">
                                {todayProgress() > 0
                                    ?
                                    <span>{todayProgress()}% dos hábitos concluídos</span>
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
