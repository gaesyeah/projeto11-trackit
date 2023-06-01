import axios from "axios";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../App";
import TodayHabit from "../../components/TodayHabit/TodayHabit";
import { URL } from "../../constants";
import { H2Formater, NullLoading, PageBody } from "../../style/PageBody";
import loadingGif from "./../../assets/loadingGif.gif";
import { Progress, TodayHabitsBox } from "./styled";

const TodayPage = ({hojeData, setHojeData}) => {

    const {config, todayProgress} = useContext(DataContext);

    const [reRender, setReRender] = useState(false);
    useEffect(() => {

        axios.get(`${URL}/habits/today`, config)
        .then(({data}) => {
            setHojeData(data);

            setReRender(true);
        })
        .catch(({response}) => {
            const {details, message} = response.data;
            console.log(`${!details ? '' : details}\n${message}`);
        });
    }, [reRender]);

    if (hojeData === null){
        return (
            <NullLoading>
                <img src={loadingGif} alt='reloading'/>
            </NullLoading>
        );
    } else {
        
        const date = dayjs().locale('pt-br').format('dddd, D/M');

        return (
            <PageBody>
                <Progress>
                    <H2Formater>
                        <h2>{date.charAt(0).toUpperCase() + date.slice(1)}</h2>
                        <p>
                            {todayProgress() > 0
                                ?
                                <span>{todayProgress()}% dos hábitos concluídos</span>
                                :
                                'Nenhum hábito concluído ainda'
                            }
                        </p>
                    </H2Formater>
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
