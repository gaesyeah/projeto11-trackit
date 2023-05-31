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
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    h2{
        margin-left: -240px;
    }
    p{
        margin-top: 17px;
        padding-right: 17px;
        font-size: 18px;
        line-height: 22px;
        color: #666666;
    }
`;