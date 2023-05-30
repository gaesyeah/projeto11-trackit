import { Habit, TodayCheck } from "./style";

const TodayHabit = ({habit}) => {
    const { id, name, done, currentSequence, highestSequence } = habit;

    const reCheckHabit = (idHabit, isChecked) => {
        if (!isChecked){
            console.log(idHabit, 'foi marcado');
        } else {
            console.log(idHabit, 'foi desmarcado');
        }
    }

    return ( 
        <Habit done={done}>
            <h3>{name}</h3>
            <p>Sequência atual: <span>{currentSequence} dia{currentSequence > 1 && 's'}</span></p>
            <p>Seu recorde: {highestSequence} dia{highestSequence > 1 && 's'}</p>
            <TodayCheck
                done={done}
                onClick={() => reCheckHabit(id, done)}
            />
        </Habit>
    );
}

export default TodayHabit;