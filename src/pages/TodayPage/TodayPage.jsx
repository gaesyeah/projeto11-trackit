import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { useContext } from "react";
import { DataContext } from "../../App";
import TodayHabit from "../../components/TodayHabit/TodayHabit";
import { PageBody } from "../../style/PageBody";
import { Progress, TodayHabitsBox } from "./styled";

const TodayPage = ({hojeData}) => {

    const {todayProgress} = useContext(DataContext);

    return (
        <PageBody>
            <Progress>
                <h2>{dayjs().locale('pt-br').format('dddd, D/M')}</h2>
                <p>
                    {hojeData > 0
                        ?
                        <span>${todayProgress()}% dos hábitos concluídos</span>
                        :
                        'Nenhum hábito concluído ainda'
                    }
                </p>
            </Progress>
            <TodayHabitsBox>
                {hojeData.map((habit) => 
                    <TodayHabit key={habit.id} habit={habit}/>
                )}
            </TodayHabitsBox>
        </PageBody>
    );
};

export default TodayPage;
