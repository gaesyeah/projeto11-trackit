import axios from "axios";
import { useContext, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { DataContext } from "../../App";
import Habit from "../../components/Habit/Habit";
import WeekDay from "../../components/WeekDay/Weekday";
import { URL, weekDays } from "../../constants";
import { PageBody } from "../../style/PageBody";
import { AddHabitBox, ConfirmButtons, MyHabits, NoHabits, PlusIcon, TopBar, WeekDayButtons } from "./styled";

const HabitsPage = () => {

    const {config} = useContext(DataContext);

    const [loading, setLoading] = useState(false);
    const [habitInput, setHabitInput] = useState('');
    const [showCreation, setShowCreation] = useState(false);
    const [habitDays, setHabitDays] = useState([]);
    
    const HABITS = [
        {
            id: 1,
            name: "Nome do hábito",
            days: [1, 3, 5]
        },
        {
            id: 2,
            name: "Nome do hábito 2",
            days: [1, 3, 4, 6]
        }
    ]
    const [createdHabits, setCreatedHabits] = useState([...HABITS]);

    const createHabit = (e) => {
        e.preventDefault();

        if (habitDays.length === 0){
            alert('Você precisa selecionar pelo menos um dia da semana!');
        } else {

            setLoading(true);

            axios.post(`${URL}/habits`, {name: habitInput, days: habitDays}, config)
            .then(() => {
                setHabitDays([]);
                setHabitInput('');
                setShowCreation(false);

                setLoading(false);
            })
            .catch(({response}) => {
                const {details, message} = response.data;
                alert(`${!details ? '' : details}\n${message}`);

                setLoading(false);
            });
        }
    }

    return (
        <PageBody>
            <TopBar>
                <h2>Meus Hábitos</h2>
                <PlusIcon onClick={() => setShowCreation(true)}/>
            </TopBar>
            {showCreation 
                &&
                <AddHabitBox onSubmit={createHabit}>
                    <input
                        disabled={loading}
                        onChange={e => setHabitInput(e.target.value)}
                        value={habitInput}
                        type="text" 
                        placeholder="nome do hábito" 
                        required 
                    />
                    <WeekDayButtons>
                        {weekDays.map((days) => 
                            <WeekDay
                                key={days.id} 
                                days={days} 
                                habitDays={habitDays} 
                                setHabitDays={setHabitDays}
                                loading={loading}
                            />
                        )}
                    </WeekDayButtons>
                    <ConfirmButtons>
                        <button
                            disabled={loading}
                            onClick={() => setShowCreation(false)}
                            type="button"
                        >Cancelar</button>
                        <button
                            disabled={loading}
                            type="submit"
                        >{!loading && 'Salvar'}
                        <ThreeDots 
                            height="45" 
                            width="45" 
                            radius="9"
                            color="#FFFFFF" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={loading}
                        /></button>
                    </ConfirmButtons>
                </AddHabitBox>}

            {createdHabits.length === 0
                ?
                <NoHabits>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabits>
                :
                <MyHabits>
                    {createdHabits.map((createdHabit) => 
                        <Habit 
                            key={createdHabit.id} 
                            createdHabit={createdHabit} 
                            weekDays={weekDays}
                        />
                    )}
                </MyHabits>
            }
        </PageBody>
    );
};

export default HabitsPage;