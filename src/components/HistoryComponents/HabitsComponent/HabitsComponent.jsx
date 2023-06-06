import { Habit } from "../../TodayHabit/style";
import { HabitChecked, HabitNotChecked } from "./styled";

const HabitsComponent = ({habit}) => {
    const {name, done} = habit;

    return (
        <Habit done={done}>
            <h3>{name}</h3>
            <h2>
                {!done ? 'Não foi concluído' : 'Foi concluído' }
            </h2>
            {!done ? <HabitNotChecked/> : <HabitChecked/> }
        </Habit>
    );
}

export default HabitsComponent;