import { MyHabitDay } from "../../../pages/HabitsPage/styled";

const MyHabitDayComponent = ({weekDay, days}) => {

    const {id, day} = weekDay;

    return (
        <MyHabitDay
            disabled
            days={days}
            day={id}
        >{day}
        </MyHabitDay>
    );
}

export default MyHabitDayComponent;