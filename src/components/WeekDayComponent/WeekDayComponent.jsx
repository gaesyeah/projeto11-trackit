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
        <MyHabitDay day={id} days={habitDays} falsebutton={false}
            disabled={loading}
            onClick={() => chooseDays(id)}
            type="button"
            data-test="habit-day"
        >{day}</MyHabitDay>
    );
}

export default WeekDayComponent;