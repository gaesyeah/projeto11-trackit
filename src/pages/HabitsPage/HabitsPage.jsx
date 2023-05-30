import { useState } from "react";
import Habit from "../../components/Habit/Habit";
import WeekDay from "../../components/WeekDay/Weekday";
import { PageBody } from "../../style/PageBody";
import { AddHabitBox, ConfirmButtons, MyHabits, NoHabits, PlusIcon, TopBar, WeekDayButtons } from "./styled";

const HabitsPage = () => {

    const weekDays = [
        { id: 1, day: 'D' },
        { id: 2, day: 'S' },
        { id: 3, day: 'T' },
        { id: 4, day: 'Q' },
        { id: 5, day: 'Q' },
        { id: 6, day: 'S' },
        { id: 7, day: 'S' },
    ];

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
        
        setHabitDays([]);
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
                        onChange={e => setHabitInput(e.target.value)}
                        value={habitInput}
                        type="text" 
                        placeholder="nome do hábito" 
                        required 
                    />
                    <WeekDayButtons>
                        {weekDays.map((days) => 
                            <WeekDay 
                                key ={days.id} 
                                days={days} 
                                habitDays={habitDays} 
                                setHabitDays={setHabitDays}
                            />
                        )}
                    </WeekDayButtons>
                    <ConfirmButtons>
                        <button onClick={() => setShowCreation(false)}type="button">Cancelar</button>
                        <button type="submit">Salvar</button>
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