import axios from "axios";

export const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit';

export const weekDays = [
    { id: 0, day: 'D' },
    { id: 1, day: 'S' },
    { id: 2, day: 'T' },
    { id: 3, day: 'Q' },
    { id: 4, day: 'Q' },
    { id: 5, day: 'S' },
    { id: 6, day: 'S' },
];

export const getAllData = (config, setHabitosData, setHojeData, setHistoricoData) => {

    axios.get(`${URL}/habits`, config)
    .then(({data}) => setHabitosData(data))
    .catch(({response}) => {
        const {details, message} = response.data;
        console.log(`${!details ? '' : details}\n${message}`);
    });
    //--------
    axios.get(`${URL}/habits/today`, config)
    .then(({data}) => setHojeData(data))
    .catch(({response}) => {
        const {details, message} = response.data;
        console.log(`${!details ? '' : details}\n${message}`);
    });
    //--------
    axios.get(`${URL}/habits/history/daily`, config)
    .then(({data}) => setHistoricoData(data))
    .catch(({response}) => {
        const {details, message} = response.data;
        console.log(`${!details ? '' : details}\n${message}`);
    });
};

export const customAlertSwal = {
    icon: 'error',
    width: 320,
    confirmButtonText: 'Ok',
    confirmButtonColor: '#52B6FF'
};

export const customConfirmSwal = {
    width: 320,
    confirmButtonText: 'Sim',
    confirmButtonColor: '#52B6FF',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    cancelButtonColor: '#CFCFCF',
};