import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";
import { DataContext } from "../../App";
import { URL } from "../../constants";
import { NullLoading, PageBody } from "../../style/PageBody";
import loadingGif from "./../../assets/loadingGif.gif";

const HistoryPage = ({historicoData, setHistoricoData}) => {

    const {config} = useContext(DataContext);

    const [reRender, setReRender] = useState(false);
    useEffect(() => {
        axios.get(`${URL}/habits/history/daily`, config)
        .then(({data}) => {
            console.log(data);
            setHistoricoData(data);

            setReRender(true);
        })
        .catch(({response}) => {
            const {details, message} = response.data;
            console.log(`${!details ? '' : details}\n${message}`);
        });
    }, [reRender]);

    if (historicoData === null) {
        return (
            <NullLoading>
                <img src={loadingGif} alt='reloading'/>
            </NullLoading>
        );
    } else {
        return (
            <PageBody>
                <HistoryBeta>
                    <h2>Histórico</h2>
                    <StyledCalendar locale="pt-BR"/>
                </HistoryBeta>
            </PageBody>
        );
    };
};

export default HistoryPage;

const HistoryBeta = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    h2{
        margin-left: -240px;
    }
`;
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
    border-radius: 6px;
    border: none;
    background-color: #FFFFFF;
    color: #52B6FF;
    button{
        color: #52B6FF;
    }
`