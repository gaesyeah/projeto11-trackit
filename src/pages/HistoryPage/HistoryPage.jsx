import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import styled from "styled-components";
import { PageBody } from "../../style/PageBody";

const HistoryPage = () => {
    return (
        <PageBody>
            <HistoryBeta>
                <h2>Histórico</h2>
                <StyledCalendar />
            </HistoryBeta>
        </PageBody>
    );
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