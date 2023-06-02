import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../App";
import Habit from "../../components/Habit/Habit";
import WeekDay from "../../components/WeekDay/Weekday";
import { URL, weekDays } from "../../constants";
import { NullLoading, PageBody } from "../../style/PageBody";
import loadingGif from "./../../assets/loadingGif.gif";
import { AddHabitBox, ConfirmButtons, MyHabits, NoHabits, PlusIcon, TopBar, WeekDayButtons } from "./styled";

const HabitsPage = ({habitosData}) => {

    const {config, setHabitosData, setHojeData, setHistoricoData} = useContext(DataContext);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [habitInput, setHabitInput] = useState('');
    const [showCreation, setShowCreation] = useState(false);
    const [habitDays, setHabitDays] = useState([]);

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
                //----------------
                axios.get(`${URL}/habits`, config)
                .then(({data}) => setHabitosData(data))
                .catch(({response}) => {
                    const {details, message} = response.data;
                    console.log(`${!details ? '' : details}\n${message}`);
                });
                //----------------
                axios.get(`${URL}/habits/today`, config)
                .then(({data}) => setHojeData(data))
                .catch(({response}) => {
                    const {details, message} = response.data;
                    console.log(`${!details ? '' : details}\n${message}`);
                });
                //---------------
                axios.get(`${URL}/habits/history/daily`, config)
                .then(({data}) => setHistoricoData(data))
                .catch(({response}) => {
                    const {details, message} = response.data;
                    console.log(`${!details ? '' : details}\n${message}`);
                })
                //---------------
            })
            .catch(({response}) => {
                const {details, message} = response.data;
                alert(`${!details ? '' : details}\n${message}`);

                setLoading(false);
            });
        }
    }

    const [reRender, setReRender] = useState(false);
    useEffect(() => {
        axios.get(`${URL}/habits`, config)
        .then(({data}) => {
            setHabitosData(data);

            setReRender(true);
        })
        .catch(({response}) => {
            const {details, message} = response.data;
            console.log(`${!details ? '' : details}\n${message}`);

            navigate('/');
        });
    }, [reRender]);

    if (habitosData === null){
        return (
            <NullLoading>
                <img src={loadingGif} alt='reloading'/>
            </NullLoading>
        );
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

            {habitosData.length === 0
                ?
                <NoHabits>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</NoHabits>
                :
                <MyHabits>
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