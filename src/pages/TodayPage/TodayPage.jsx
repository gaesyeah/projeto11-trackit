import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import { useState } from "react";
import TodayHabit from "../../components/TodayHabit/TodayHabit";
import { PageBody } from "../../style/PageBody";
import { Progress, TodayHabitsBox } from "./styled";

const TodayPage = () => {

    const TODAYHABITS = [
        {
            "id": 3,
            "name": "Acordar",
            "done": true,
            "currentSequence": 1,
            "highestSequence": 1
        },
        {
            "id": 4,
            "name": "Dormir",
            "done": true,
            "currentSequence": 1,
            "highestSequence": 2
        },
        {
            "id": 6,
            "name": "Estudar",
            "done": false,
            "currentSequence": 3,
            "highestSequence": 6
        },
    ];
    const [todayHabits, setTodayHabits] = useState(...[TODAYHABITS]);

    //retorna a % das tarefas do dia concluidas
    console.log(Math.trunc((todayHabits.filter((habit) => habit.done).length / todayHabits.length) * 100));

    return (
        <PageBody>
            <Progress>
                <h2>{dayjs().locale('pt-br').format('dddd, D/M')}</h2>
                <p>Nenhum hábito concluído ainda</p>
            </Progress>
            <TodayHabitsBox>
                {todayHabits.map((habit) => 
                    <TodayHabit key={habit.id} habit={habit}/>
                )}
            </TodayHabitsBox>
        </PageBody>
    );
};

export default TodayPage;
