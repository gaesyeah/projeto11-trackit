import { useState } from "react";
import styled from "styled-components";
import { PlusSquare } from "styled-icons/evaicons-solid";
import { PageBody } from "../../style/PageBody";

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

    const [showCreation, setShowCreation] = useState(false);
    const [habitDays, setHabitDays] = useState([]);
    console.log(habitDays);

    const chooseDays = (id) => {
        if (!habitDays.includes(id)) {
            setHabitDays([...habitDays, id]);
        } else {
            setHabitDays([...habitDays.filter(dayId => dayId !== id)]);
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
                <AddHabitBox>
                    <input 
                        type="text" 
                        placeholder="nome do hábito" 
                        required 
                    />
                    <WeekDayButtons>
                        {weekDays.map(({ id, day }) =>
                            <button 
                                onClick={() => chooseDays(id)}
                                key={id} 
                                type="button"
                            >{day}</button>
                        )}
                    </WeekDayButtons>
                    <ConfirmButtons>
                        <button onClick={() => setShowCreation(false)}type="button">Cancelar</button>
                        <button type="submit">Salvar</button>
                    </ConfirmButtons>
                </AddHabitBox>
            }
            <NoHabits>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabits>
        </PageBody>
    );
};

export default HabitsPage;

const TopBar = styled.div`
    width: 375px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 17px 0px -10px 0px;
    h2{
        margin-left: 17px;
        font-size: 23px;
        line-height: 29px;
        color: #126BA5;
    }
`;
const NoHabits = styled.p`
    margin-top: 27px;
    font-size: 18px;
    line-height: 22px;
    color: #666666;
    width: 338px;
`;
const AddHabitBox = styled.form`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 22px;
    width: 340px;
    min-height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    input{
        margin-top: 18px;
        width: 303px;
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        line-height: 25px;
    }
`;
const ConfirmButtons = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    column-gap: 14px;
    margin: 0 16px 15px 0;
    button{
        font-size: 16px;
        line-height: 20px;
        width: 84px;
        height: 34px;
        &:nth-child(1){
            background-color: #FFFFFF;
            color: #52B6FF;
        }
    }
`
const WeekDayButtons = styled.div`
    margin-left: -69px;
    display: flex;
    column-gap: 4px;
    button{
        width: 30px;
        height: 30px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        font-size: 20px;
        line-height: 25px;
        color: #DBDBDB;

        /* background: #CFCFCF;
        color: #FFFFFF; */
    }
`;
const PlusIcon = styled(PlusSquare)`
    cursor: pointer;
    width: 54px;
    color: #52B6FF;
    margin-right: 10px;
`