import axios from "axios";
import { useContext } from "react";
import Swal from "sweetalert2";
import { URL, customAlertSwal, customConfirmSwal, getAllData, weekDays } from "../../constants";
import { DataContext } from "../../contexts/DataContext";
import { UserContext } from "../../contexts/UserContext";
import { MyHabit, MyHabitDays, TrashIcon } from "../../pages/HabitsPage/styled";
import MyHabitComponent from "./MyHabitComponent/MyHabitComponent";

const Habit = ({createdHabit}) => {
    const {id, name, days} = createdHabit;

    const {setHabitosData, setHojeData, setHistoricoData} = useContext(DataContext);
    const {config} = useContext(UserContext);

    const deleteHabit = (idHabit) => {
        
        customConfirmSwal.icon = 'warning';
        customConfirmSwal.title = '<span style=";font-size: 18px">Você realmente deseja apagar esse hábito?</span>';
        Swal.fire(customConfirmSwal)
        .then((result) => {
            if (result.isConfirmed) {
                
                axios.delete(`${URL}/habits/${idHabit}`, config)
                .then(() => getAllData(config, setHabitosData, setHojeData, setHistoricoData))
                .catch(({response}) => {
                    const {details, message} = response.data;

                    customAlertSwal.title = `<span style="color: #f24d4d;font-size: 18px">${!details ? '' : details+'\n'}${message}</span>`;
                    Swal.fire(customAlertSwal);
                });
            }
        })
    };

    return (
        <MyHabit data-test="habit-container">
            <h3 data-test="habit-name">{name}</h3>
            <TrashIcon data-test="habit-delete-btn" 
                onClick={() => deleteHabit(id)}
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