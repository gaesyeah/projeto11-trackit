import { MyHabitDay } from "../../pages/HabitsPage/styled";

const WeekDayComponent = ({weekDay, habitDays, setHabitDays, loading}) => {
    const {id, day} = weekDay;

    const chooseDays = (id) => {
        if (!habitDays.includes(id)) {
            setHabitDays([...habitDays, id]);
        } else {
            setHabitDays([...habitDays.filter(dayId => dayId !== id)]);
        }
    }

    return (
        <MyHabitDay day={id} days={habitDays}
            disabled={loading}
            onClick={() => chooseDays(id)}
            type="button"
        >{day}</MyHabitDay>
    );
}

export default WeekDayComponent;