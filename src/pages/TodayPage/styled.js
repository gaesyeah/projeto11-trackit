import styled from "styled-components";

export const Progress = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    h1{
        margin-top: 0;
        color: #BABABA;
    }
    span{
        color: #8FC549;
    }
`;
export const TodayHabitsBox = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    height: 498px;
    margin-top: 26px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;