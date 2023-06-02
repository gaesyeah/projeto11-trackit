import { MyHabitDay } from "../../../pages/HabitsPage/styled";

const MyHabitComponent = ({weekDay, days}) => {

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

export default MyHabitComponent;