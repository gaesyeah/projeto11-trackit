import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { useContext, useEffect } from "react";
import { DataContext } from "../../App";
import TodayHabit from "../../components/TodayHabit/TodayHabit";
import { URL } from "../../constants";
import { PageBody } from "../../style/PageBody";
import loadingGif from "./../../assets/loadingGif.gif";
import { Loading, Progress, TodayHabitsBox } from "./styled";

const TodayPage = ({hojeData, setHojeData}) => {

    const {config, todayProgress} = useContext(DataContext);

    if (hojeData === null){

        //adicionei isso para caso o usuario dê f5(localStorage), já que fiz as requisições no App para deixar a experiencia do usuario melhor com os carregamentos
        useEffect(() => {
            axios.get(`${URL}/habits/today`, config)
            .then(({data}) => setHojeData(data))
            .catch(({response}) => {
                const {details, message} = response.data;
                console.log(`${!details ? '' : details}\n${message}`);
            });
        }, []);

        return (
            <Loading>
                <img src={loadingGif} alt='reloading'/>
            </Loading>
        );
    } else {
        return (
            <PageBody>
                <Progress today={todayProgress()}>
                    <h2>{dayjs().locale('pt-br').format('dddd, D/M')}</h2>
                    <p>
                        {todayProgress() > 0
                            ?
                            <span>{todayProgress()}% dos hábitos concluídos</span>
                            :
                            'Nenhum hábito concluído ainda'
                        }
                    </p>
                </Progress>
                <TodayHabitsBox>
                    {hojeData.map((habit) => 
                        <TodayHabit
                            setHojeData={setHojeData}
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
