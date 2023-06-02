import axios from "axios";
import { useContext, useState } from "react";
import { DataContext } from "../../App";
import { URL } from "../../constants";
import reCheckGif from "./../../assets/reCheckGif.gif";
import { Habit, TodayCheck } from "./style";

const TodayHabit = ({habit}) => {
    const { id, name, done, currentSequence, highestSequence } = habit;

    const {config, setHojeData} = useContext(DataContext);

    const [loading, setLoading] = useState(false);

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
            axios.get(`${URL}/habits/today`, config)
            .then(({data}) => {
                setHojeData(data);

                setLoading(false);
            })
            .catch(({response}) => {
                const {details, message} = response.data;
                console.log(`${!details ? '' : details}\n${message}`);
            });
        })
        .catch(({response}) => {
            const {details, message} = response.data;
            console.log(`${!details ? '' : details}\n${message}`);

            setLoading(false);
        });
    }

    return ( 
        <Habit done={done} current={currentSequence} highest={highestSequence}>
            <h3>{name}</h3>
            <p>Sequência atual: <span>{currentSequence} dia{currentSequence !== 1 && 's'}</span></p>
            <p>Seu recorde: <span>{highestSequence} dia{highestSequence !== 1 && 's'}</span></p>
            <div>
                {loading && <img src={reCheckGif} alt="loading"/>}
                <TodayCheck
                    loading={loading}
                    done={done}
                    onClick={() => {!loading && reCheckHabit(id, done)}}
                />
            </div>
        </Habit>
    );
}

export default TodayHabit;