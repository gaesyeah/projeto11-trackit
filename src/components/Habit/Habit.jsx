import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../../App";
import { URL, getAllData, weekDays } from "../../constants";
import { MyHabit, MyHabitDays, TrashIcon } from "../../pages/HabitsPage/styled";
import MyHabitComponent from "./MyHabitComponent/MyHabitComponent";

const Habit = ({createdHabit}) => {
    const {id, name, days} = createdHabit;

    const {config, setHabitosData, setHojeData, setHistoricoData} = useContext(DataContext);

    const deleteHabit = (idHabit) => {
        if (confirm('Você realmente deseja apagar esse hábito?')){
            
            axios.delete(`${URL}/habits/${idHabit}`, config)
            .then(() => getAllData(config, setHabitosData, setHojeData, setHistoricoData))
            .catch(({response}) => {
                const {details, message} = response.data;
                console.log(`${!details ? '' : details}\n${message}`);
            });
        };
    };

    return (
        <MyHabit data-test="habit-container">
            <h3 data-test="habit-name">{name}</h3>
            <TrashIcon 
                onClick={() => deleteHabit(id)}
                data-test="habit-delete-btn" 
            />
            <MyHabitDays>
                {weekDays.map(weekDay =>
                    <MyHabitComponent key={weekDay.id} days={days} weekDay={weekDay}/>
                )}
            </MyHabitDays>
        </MyHabit>
    );
}

export default Habit;