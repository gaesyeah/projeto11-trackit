import { MyHabit, MyHabitDay, MyHabitDays, TrashIcon } from "../../pages/HabitsPage/styled";

const Habit = ({createdHabit, weekDays}) => {
    const {id, name, days} = createdHabit;

    const deleteHabit = (idHabit) => {
        if (confirm('Você realmente deseja apagar esse hábito? Não tem volta.')){
            console.log('apagado');
        }
    }

    return (
        <MyHabit key={id}>
            <h3>{name}</h3>
            <TrashIcon onClick={() => deleteHabit(id)} />
            <MyHabitDays>
                {weekDays.map(({ id, day }) =>
                    <MyHabitDay
                        disabled
                        days={days}
                        day={id}
                        key={id}>{day}
                    </MyHabitDay>
                )}
            </MyHabitDays>
        </MyHabit>
    );
}

export default Habit;