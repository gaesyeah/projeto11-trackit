import { MyHabitDay } from "../../../pages/HabitsPage/styled";

const MyHabitComponent = ({weekDay, days}) => {

    const {id, day} = weekDay;

    return (
        <MyHabitDay days={days} day={id} falsebutton={true} 
            disabled
            data-test="habit-day"
        >{day}
        </MyHabitDay>
    );
}

export default MyHabitComponent;