import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import { DataContext } from "../../../App";

const CalendarComponent = ({setClickedHabits}) => {

    const {historicoData} = useContext(DataContext);

    //criação dos dias usando o daysjs para personalizar o calendario
    //----------------------------------------------------------------
    const [allDone, setAllDone] = useState([]);
    const [notAllDone, setNotAllDone] = useState([]);
    //faz push nos arrays vazios acima dos dias em que todos os habitos do dia foram/não foram concluidos, respectivamente
    useEffect(() => {
        //vai iterar uma vez para cada dia
        historicoData.forEach(({day, habits}) => {
            //vai iterar uma vez para cada habito desse dia
            //e será verificado se o tamanho do array filtrado com done=true, é igual ao do array inteiro
            if ((habits.filter(({done}) => done).length) === habits.map(({done}) => done).length) {
                setAllDone([...allDone, day]);
            } else {
                setNotAllDone([...notAllDone, day]);
            }
        })
    }, [])

    //função para converter os dias para o formato americano
    const enDayConvert = (date) => {
        const dateSplited = date.split('/');
        const day = dateSplited[0];
        const month = dateSplited[1];
        const year = dateSplited[2];
        return ([month, day, year]).join('/');
    }

    //uso do daysjs para criar os dias
    const allDoneDaysjs = allDone.map(day => dayjs(enDayConvert(day)));
    const notAllDoneDaysjs = notAllDone.map(day => dayjs(enDayConvert(day)));
    //---------------------------------------------------------------

    return (
        <StyledCalendar 
            
            tileClassName={({ date, view }) => {
                if (view === 'month'){
                    //esse if não permite que classes sejam aplicadas para o dia atual
                    if (!(date.toDateString() === new Date().toDateString())) {
                    //aqui é onde é retornado as classes especificas para os dias criados pelo daysjs
                        if (allDoneDaysjs.some(d => d.isSame(date, 'day'))){
                            return 'classAllDone';
                        }
                        if (notAllDoneDaysjs.some(d => d.isSame(date, 'day'))){
                            return 'classNotAllDone';
                        }
                    }
                }
            }}

            formatDay={(locale, date) => {
                //aqui é retornado o dia com 2 digitos(com 0 na frente) caso ele tenha 1 digito
                return date.toLocaleString(locale, { day: '2-digit' });
            }}

            onClickDay={(value) => {
                const selectedHabits = [];
                //constantes para guardar o dia clicado e o dia atual, respectivamente
                const clickedDate = dayjs(value).format('DD/MM/YYYY');
                const currendDate = dayjs().format('DD/MM/YYYY');
                //entra no if somente se o dia clicado e o dia atual forem diferentes
                if (clickedDate !== currendDate) {
                    //acha dentro do array do historico o dia igual ao dia clicado
                    const selectedDate = historicoData.find(({ day }) => day === clickedDate);
                    //entra no if somente se o dia clicado for verde ou vermelho(está no historicoData)
                    if (selectedDate !== undefined) {
                        const {habits} = selectedDate;
                        /*itera o array habits para popular o array selectedHabits com o 
                        nome do habito e se o mesmo foi concluido (separado por objetos)*/
                        habits.forEach(({name, done}, i) => {
                            selectedHabits[i] = {name, done};
                        })
                        //finalmente seta a variavel de estado para renderizar os habitos
                        setClickedHabits(selectedHabits);
                    } else {
                        setClickedHabits([]);
                    }
                }
            }}
        />
    );
}

export default CalendarComponent;

const StyledCalendar = styled(Calendar)`
    .react-calendar__navigation__label {
        height: 58px;
        margin-top: 4px;
        line-height: 19px;
        color: #126BA5;
    }
    box-sizing: content-box;
    width: 335px;
    margin-top: 11px;
    border-radius: 10px;
    border: none;
    background-color: #FFFFFF;
    color: #52B6FF;
    button{
        color: #52B6FF;
    }
    .classAllDone{
        border-radius: 100%;
        background-color: #5cba5c;
        color: #126BA5;
    }
    .classNotAllDone{
        border-radius: 100%;
        background-color: #f24d4d;
        color: #126BA5;
    }
`;