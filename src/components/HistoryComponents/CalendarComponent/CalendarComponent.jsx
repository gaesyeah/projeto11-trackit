import dayjs from "dayjs";
import { useContext } from "react";
import Calendar from "react-calendar";
import styled from "styled-components";
import { DataContext } from "../../../App";

const CalendarComponent = ({setClickedHabits}) => {

    const {historicoData} = useContext(DataContext);

    //função para converter dias do formato brasileiro para o formato americano
    const enDayConvert = (date) => {
        const dateSplited = date.split('/');
        const day = dateSplited[0];
        const month = dateSplited[1];
        const year = dateSplited[2];
        return ([month, day, year]).join('/');
    }

    return (
        <StyledCalendar data-test="calendar"
            //----
            tileClassName={({ date }) => {
                //-------------------
                const allDone = [];
                const notAllDone = [];
        
                //vai iterar uma vez para cada dia
                historicoData.forEach(({day, habits}) => {
                    //será verificado se o tamanho do array de habitos filtrado com done=true é igual ao original
                    //se SIM, esse dia será inserido numa array, se NÃO, numa outra array
                    //OBS: o daysjs e a função enDayConvert são responsaveis por converter cada dia num formato "válido"
                    if ((habits.filter(({done}) => done).length) === habits.length) {
                        allDone.push(dayjs(enDayConvert(day)));
                    } else {
                        notAllDone.push(dayjs(enDayConvert(day)));
                    }
                })
                //-------------------
                //OBS: É aqui onde as classes personalizadas serão aplicadas para cada dia
                //esse if não permite que classes sejam aplicadas para o dia atual
                if (!(date.toDateString() === new Date().toDateString())) {
                    if (allDone.some(day => day.isSame(date))){
                        return 'classAllDone';
                    }
                    if (notAllDone.some(day => day.isSame(date))){
                        return 'classNotAllDone';
                    }
                }
            }}
            //----
            formatDay={(locale, date) => {
                //aqui é retornado o dia com 2 digitos(com 0 na frente) caso ele tenha 1 digito
                return date.toLocaleString(locale, { day: '2-digit' });
            }}
            //----
            onClickDay={(value) => {
                const selectedHabits = [];
                //constantes para guardar o dia clicado e o dia atual, respectivamente
                const clickedDate = dayjs(value).format('DD/MM/YYYY');
                const currendDate = dayjs().format('DD/MM/YYYY');
                //entra no if somente se o dia clicado e o dia atual forem diferentes
                if (clickedDate !== currendDate) {
                    //procura um dia no historicoData igual ao dia clicado(por consequencia, é um dia "pintado")
                    const selectedDate = historicoData.find(({ day }) => day === clickedDate)
                    //só entra no if se ele tiver sido encontrado
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
                } else {
                    setClickedHabits([]);
                }
            }}
            //----
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