import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { URL, customAlertSwal } from "../../constants";
import { DataContext } from "../../contexts/DataContext";
import { UserContext } from "../../contexts/UserContext";
import reCheckGif from "./../../assets/reCheckGif.gif";
import { Habit, TodayCheck } from "./style";

const TodayHabit = ({habit}) => {
    const { id, name, done, currentSequence, highestSequence } = habit;

    const {setHojeData} = useContext(DataContext);
    const {config} = useContext(UserContext);

    const [loading, setLoading] = useState(false);

    const getReCheckedHabits = () => {
        axios.get(`${URL}/habits/today`, config)
        .then(({data}) => {
            setHojeData(data);
    
            setLoading(false);
        })
        .catch(({response}) => {
            const {details, message} = response.data;
            console.log(`${!details ? '' : details}\n${message}`);
        });
    };

    const reCheckHabit = (idHabit, isChecked) => {
        setLoading(true);
        
        let pathname;
        if (!isChecked) {
            pathname = 'check';
        }else {
            pathname = 'uncheck';
        }
        
        axios.post(`${URL}/habits/${idHabit}/${pathname}`, [], config)
        .then(() => {
            getReCheckedHabits();
        })
        .catch(({response}) => {
            const {details, message} = response.data;

            customAlertSwal.title = `<span style="color: #f24d4d;font-size: 18px">${!details ? '' : details+'\n'}${message}</span>`;
            Swal.fire(customAlertSwal);

            setLoading(false);
        });
    }

    return ( 
        <Habit done={done} current={currentSequence} highest={highestSequence} data-test="today-habit-container">
            <h3 data-test="today-habit-name">{name}</h3>
            <p data-test="today-habit-sequence">
                Sequência atual: 
                <span> {currentSequence} dia{currentSequence !== 1 && 's'}</span>
            </p>
            <p data-test="today-habit-record">
                Seu recorde:  
                <span> {highestSequence} dia{highestSequence !== 1 && 's'}</span>
            </p>
            <div data-test="today-habit-check-btn"
                onClick={() => {!loading && reCheckHabit(id, done)}}
            >
                {loading && <img src={reCheckGif} alt="loading"/>}
                <TodayCheck loading={loading} done={done}/>
            </div>
        </Habit>
    );
}

export default TodayHabit;