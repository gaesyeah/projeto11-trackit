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
        <MyHabitDay day={id} days={habitDays} falsebutton={false} type="button" data-test="habit-day"
            disabled={loading}
            onClick={() => chooseDays(id)}
        >{day}</MyHabitDay>
    );
}

export default WeekDayComponent;