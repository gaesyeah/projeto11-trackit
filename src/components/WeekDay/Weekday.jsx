import { MyHabitDay } from "../../pages/HabitsPage/styled";

const WeekDay = ({days, habitDays, setHabitDays}) => {
    const {id, day} = days;

    const chooseDays = (id) => {
        if (!habitDays.includes(id)) {
            setHabitDays([...habitDays, id]);
        } else {
            setHabitDays([...habitDays.filter(dayId => dayId !== id)]);
        }
    }

    return (
        <MyHabitDay day={id} days={habitDays} 
            onClick={() => chooseDays(id)}
            type="button"
        >{day}</MyHabitDay>
    );
}

export default WeekDay;