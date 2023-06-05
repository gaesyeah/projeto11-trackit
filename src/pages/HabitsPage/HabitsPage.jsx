import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Blocks, ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from 'sweetalert2';
import { DataContext } from "../../App";
import Habit from "../../components/Habit/Habit";
import WeekDayComponent from "../../components/WeekDayComponent/WeekDayComponent";
import { URL, customAlertSwal, getAllData, weekDays } from "../../constants";
import { NullLoading, PageBody } from "../../style/PageBody";
import { AddHabitBox, ConfirmButtons, MyHabits, NoHabits, PlusIcon, TopBar, WeekDayButtons } from "./styled";

const HabitsPage = ({habitosData}) => {

    const {config, setHabitosData, setHojeData, setHistoricoData, showSideBar} = useContext(DataContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [habitInput, setHabitInput] = useState('');
    const [showCreation, setShowCreation] = useState(false);
    const [habitDays, setHabitDays] = useState([]);

    const createHabit = (e) => {
        e.preventDefault();

        let alertTitle = undefined;
        if (habitInput.length === 0){
            alertTitle = 'O hábito precisa de um nome';
        } else if (habitDays.length === 0){
            alertTitle = 'Você precisa selecionar pelo menos um dia da semana';
        } 
        
        if (alertTitle !== undefined) {
            customAlertSwal.title = `<span style="color: #f24d4d;font-size: 18px">${alertTitle}</span>`;
            Swal.fire(customAlertSwal);
        }
        else {

            setLoading(true);

            axios.post(`${URL}/habits`, {name: habitInput, days: habitDays}, config)
            .then(() => {
                setHabitDays([]);
                setHabitInput('');
                setShowCreation(false);

                setLoading(false);
                //----------------
                getAllData(config, setHabitosData, setHojeData, setHistoricoData);
                //---------------
            })
            .catch(({response}) => {
                const {details, message} = response.data;
                
                customAlertSwal.title = `<span style="color: #f24d4d;font-size: 18px">${!details ? '' : details+'\n'}${message}</span>`;
                Swal.fire(customAlertSwal);

                setLoading(false);
            });
        }
    }

    useEffect(() => {
        axios.get(`${URL}/habits`, config)
        .then(({data}) => setHabitosData(data))
        .catch(({response}) => {
            const {details, message} = response.data;
            console.log(`${!details ? '' : details}\n${message}`);

            navigate('/');
        });
    }, []);

    if (habitosData === null){
        return (
            <NullLoading>
                <Blocks visible={habitosData === null} height="100" width="100"/>
            </NullLoading>
        );
    }
    return (
        <PageBody showSideBar={showSideBar}>
            <TopBar>
                <h2>Meus Hábitos</h2>
                <PlusIcon 
                    onClick={() => setShowCreation(true)}
                    data-test="habit-create-btn"
                />
            </TopBar>
            <AddHabitBox showCreation={showCreation}
                onSubmit={createHabit} 
                data-test="habit-create-container"
            >
                <input
                    disabled={loading}
                    onChange={e => setHabitInput(e.target.value)}
                    value={habitInput}
                    type="text" 
                    placeholder="nome do hábito" 
                    data-test="habit-name-input" 
                />
                <WeekDayButtons>
                    {weekDays.map((weekDay) => 
                        <WeekDayComponent
                            key={weekDay.id} 
                            weekDay={weekDay} 
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
                        data-test="habit-create-cancel-btn"
                    >Cancelar</button>
                    <button
                        disabled={loading}
                        type="submit"
                        data-test="habit-create-save-btn"
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
                </AddHabitBox>

            {habitosData.length === 0
                ?
                <NoHabits>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabits>
                :
                <MyHabits small={false}>
                    {habitosData.map((createdHabit) => 
                        <Habit 
                            key={createdHabit.id} 
                            createdHabit={createdHabit} 
                        />
                    )}
                </MyHabits>
            }
        </PageBody>
    );
};

export default HabitsPage;

const StyledSwal = styled.button`
    width: auto;
`;