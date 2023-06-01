import { Habit } from "../../TodayHabit/style";
import { HabitChecked, HabitNotChecked } from "./styled";

const HabitsComponent = ({habit}) => {
    const {name, done} = habit;

    return (
        <Habit>
            <h3>{name}</h3>
            <h1><span>
                {!done 
                    ? 
                    'Não foi concluído'
                    :
                    'Foi concluído'
                }
            </span></h1>
            {!done 
                ? 
                <HabitNotChecked/> 
                :
                <HabitChecked/>
            }
        </Habit>
    );
}

export default HabitsComponent;