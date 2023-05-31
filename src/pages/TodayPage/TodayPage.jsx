import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { useContext } from "react";
import { DataContext } from "../../App";
import TodayHabit from "../../components/TodayHabit/TodayHabit";
import { PageBody } from "../../style/PageBody";
import loadingGif from "./../../assets/loadingGif.gif";
import { Loading, Progress, TodayHabitsBox } from "./styled";

const TodayPage = ({hojeData, setHojeData}) => {

    const {todayProgress} = useContext(DataContext);

    if (hojeData === null){
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
