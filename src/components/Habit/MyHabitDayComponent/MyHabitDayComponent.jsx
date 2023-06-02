import { MyHabitDay } from "../../../pages/HabitsPage/styled";

const MyHabitDayComponent = ({wk, days}) => {

    const {id, day} = wk;

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