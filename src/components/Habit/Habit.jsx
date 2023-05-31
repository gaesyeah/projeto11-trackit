import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../../App";
import { URL } from "../../constants";
import { MyHabit, MyHabitDay, MyHabitDays, TrashIcon } from "../../pages/HabitsPage/styled";

const Habit = ({createdHabit, weekDays, setHabitosData}) => {
    const {id, name, days} = createdHabit;

    const {config} = useContext(DataContext);

    const deleteHabit = (idHabit) => {
        if (confirm('Você realmente deseja apagar esse hábito?')){
            
            axios.delete(`${URL}/habits/${idHabit}`, config)
            .then(() => {
                axios.get(`${URL}/habits`, config)
                .then(({data}) => setHabitosData(data))
                .catch(({response}) => {
                    const {details, message} = response.data;
                    console.log(`${!details ? '' : details}\n${message}`);
                });
            })
            .catch(({response}) => {
                const {details, message} = response.data;
                console.log(`${!details ? '' : details}\n${message}`);
            });
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