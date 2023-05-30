import styled from "styled-components";
import { PageBody } from "../../style/PageBody";

const HistoryPage = () => {
    return (
        <PageBody>
            <HistoryBeta>
                <h2>Histórico</h2>
                <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            </HistoryBeta>
        </PageBody>
    );
};

export default HistoryPage;

const HistoryBeta = styled.div`
    p{
        margin-top: 17px;
        margin-left: 25px;
        padding-right: 25px;
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
`;