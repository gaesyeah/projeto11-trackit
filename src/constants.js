import axios from "axios";
import Swal from "sweetalert2";

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
    confirmButtonColor: '#126BA5'
};

export const customConfirmSwal = {
    width: 320,
    confirmButtonText: 'Sim',
    confirmButtonColor: '#126BA5',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    cancelButtonColor: '#CFCFCF',
};

export const customReloginSwal = {
    icon: 'info',
    title: '<span style=";font-size: 18px">Você não está conectado</span>',
    width: 320,
    confirmButtonText: 'Ok',
    confirmButtonColor: '#126BA5'
}

export const customCreatedAccSwal = {
    icon: 'success',
    title: `<span style="color: #5cba5c;font-size: 18px">Conta criada com sucesso!</span>`,
    width: 320,
    confirmButtonText: 'Ok',
    confirmButtonColor: '#126BA5'
}

export const login2nd = (loginAfterRegister, infos, setLoginData, navigate, setLoading) => {
    axios.post(`${URL}/auth/login`, infos)
    .then(({data}) => {
        if (loginAfterRegister){
            Swal.fire(customCreatedAccSwal);
        }
        setLoginData(data);
        navigate('/hoje');
    })
    .catch(() => {
        Swal.fire(customAlertSwal);
        setLoading(false);
    })
}

