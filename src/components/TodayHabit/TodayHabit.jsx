import axios from "axios";
import { useContext } from "react";
import { DataContext } from "../../App";
import { URL } from "../../constants";
import { Habit, TodayCheck } from "./style";

const TodayHabit = ({habit, setHojeData}) => {
    const { id, name, done, currentSequence, highestSequence } = habit;

    const {config} = useContext(DataContext);
    console.log(config);

    const reCheckHabit = (idHabit, isChecked) => {
        let pathname;
        if (!isChecked) {
            pathname = 'check';
        }else {
            pathname = 'uncheck';
        }

        axios.post(`${URL}/habits/${idHabit}/${pathname}`, [], config)
        .then(() => {
            axios.get(`${URL}/habits/today`, config)
            .then(({data}) => setHojeData(data))
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

    return ( 
        <Habit done={done} current={currentSequence} highest={highestSequence}>
            <h3>{name}</h3>
            <p>Sequência atual: <span>{currentSequence} dia{currentSequence !== 1 && 's'}</span></p>
            <p>Seu recorde: {highestSequence} dia{highestSequence !== 1 && 's'}</p>
            <TodayCheck
                done={done}
                onClick={() => reCheckHabit(id, done)}
            />
        </Habit>
    );
}

export default TodayHabit;